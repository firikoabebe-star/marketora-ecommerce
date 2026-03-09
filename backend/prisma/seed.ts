import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin.email);

  // Create test user
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
    },
  });

  console.log('Test user created:', user.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'mens' },
      update: {},
      create: {
        name: "Men's",
        slug: 'mens',
        description: 'Shop the latest men\'s collection',
        imageUrl: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'womens' },
      update: {},
      create: {
        name: "Women's",
        slug: 'womens',
        description: 'Discover women\'s fashion',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kids' },
      update: {},
      create: {
        name: 'Kids',
        slug: 'kids',
        description: 'Kids collection',
        imageUrl: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2',
      },
    }),
  ]);

  console.log('Categories created');


  // Create sample products (Prices in Ethiopian Birr - ETB)
  const products = [
    {
      name: 'Air Max 270',
      slug: 'air-max-270',
      description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
      price: 18500.00, // ~150 USD in ETB
      categoryId: categories[0].id,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      ],
      featured: true,
      variants: [
        { size: 'US 8', color: 'Black', sku: 'AM270-BLK-8', stock: 10 },
        { size: 'US 9', color: 'Black', sku: 'AM270-BLK-9', stock: 15 },
        { size: 'US 10', color: 'Black', sku: 'AM270-BLK-10', stock: 8 },
        { size: 'US 8', color: 'White', sku: 'AM270-WHT-8', stock: 12 },
        { size: 'US 9', color: 'White', sku: 'AM270-WHT-9', stock: 20 },
      ],
    },
    {
      name: 'React Infinity Run',
      slug: 'react-infinity-run',
      description: 'Designed to help reduce injury and keep you on the run.',
      price: 19800.00, // ~160 USD in ETB
      categoryId: categories[0].id,
      images: [
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      ],
      featured: true,
      variants: [
        { size: 'US 8', color: 'Blue', sku: 'RIR-BLU-8', stock: 5 },
        { size: 'US 9', color: 'Blue', sku: 'RIR-BLU-9', stock: 10 },
        { size: 'US 10', color: 'Blue', sku: 'RIR-BLU-10', stock: 7 },
      ],
    },
    {
      name: 'Sportswear Hoodie',
      slug: 'sportswear-hoodie',
      description: 'Classic comfort in a relaxed fit hoodie.',
      price: 8000.00, // ~65 USD in ETB
      categoryId: categories[1].id,
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
      ],
      featured: false,
      variants: [
        { size: 'S', color: 'Gray', sku: 'SWH-GRY-S', stock: 20 },
        { size: 'M', color: 'Gray', sku: 'SWH-GRY-M', stock: 25 },
        { size: 'L', color: 'Gray', sku: 'SWH-GRY-L', stock: 15 },
        { size: 'XL', color: 'Gray', sku: 'SWH-GRY-XL', stock: 10 },
      ],
    },
  ];

  for (const productData of products) {
    const { variants, ...productInfo } = productData;
    await prisma.product.upsert({
      where: { slug: productInfo.slug },
      update: {},
      create: {
        ...productInfo,
        variants: {
          create: variants,
        },
      },
    });
  }

  console.log('Products created');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
