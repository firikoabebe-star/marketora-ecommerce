import prisma from '../config/database';
import { AppError } from '../utils/AppError';

export class CategoryService {
  async getCategories() {
    return prisma.category.findMany({
      include: {
        children: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
        products: {
          where: { deletedAt: null },
          include: {
            variants: true,
          },
        },
      },
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    return category;
  }

  async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    parentId?: string;
  }) {
    return prisma.category.create({
      data,
    });
  }

  async updateCategory(id: string, data: Partial<{
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    parentId: string;
  }>) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    await prisma.category.delete({
      where: { id },
    });
  }
}
