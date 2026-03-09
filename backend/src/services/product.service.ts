import prisma from '../config/database';
import { AppError } from '../utils/AppError';
import { Prisma } from '@prisma/client';

export class ProductService {
  async getProducts(filters: {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
    search?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      deletedAt: null,
    };

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = filters.minPrice;
      if (filters.maxPrice) where.price.lte = filters.maxPrice;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.size || filters.color) {
      where.variants = {
        some: {
          ...(filters.size && { size: filters.size }),
          ...(filters.color && { color: filters.color }),
          stock: { gt: 0 },
        },
      };
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (filters.sortBy === 'price-asc') orderBy.price = 'asc';
    else if (filters.sortBy === 'price-desc') orderBy.price = 'desc';
    else if (filters.sortBy === 'newest') orderBy.createdAt = 'desc';
    else orderBy.createdAt = 'desc';

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug, deletedAt: null },
      include: {
        category: true,
        variants: true,
      },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }

  async createProduct(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    categoryId: string;
    images: string[];
    featured?: boolean;
    variants: Array<{ size: string; color: string; sku: string; stock: number }>;
  }) {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        images: data.images,
        featured: data.featured || false,
        variants: {
          create: data.variants,
        },
      },
      include: {
        variants: true,
        category: true,
      },
    });

    return product;
  }

  async updateProduct(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description: string;
      price: number;
      categoryId: string;
      images: string[];
      featured: boolean;
    }>
  ) {
    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        variants: true,
        category: true,
      },
    });

    return product;
  }

  async deleteProduct(id: string) {
    await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getFeaturedProducts() {
    return prisma.product.findMany({
      where: { featured: true, deletedAt: null },
      include: {
        category: true,
        variants: true,
      },
      take: 8,
    });
  }
}
