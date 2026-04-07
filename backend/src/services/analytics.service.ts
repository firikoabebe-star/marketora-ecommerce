import prisma from '../config/database';
import { OrderStatus } from '@prisma/client';

export class AnalyticsService {
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalRevenue,
      thisMonthRevenue,
      totalOrders,
      pendingOrders,
      processingOrders,
      totalUsers,
      recentOrders,
      lowStockProducts,
      topCategories
    ] = await Promise.all([
      // Total Revenue
      prisma.order.aggregate({
        where: { NOT: { status: 'CANCELLED' } },
        _sum: { total: true },
      }),
      // This Month Revenue
      prisma.order.aggregate({
        where: {
          NOT: { status: 'CANCELLED' },
          createdAt: { gte: firstDayOfMonth },
        },
        _sum: { total: true },
      }),
      // Total Orders
      prisma.order.count(),
      // Pending Orders
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      // Processing Orders
      prisma.order.count({ where: { status: OrderStatus.PROCESSING } }),
      // Total Users
      prisma.user.count({ where: { deletedAt: null } }),
      // Recent Orders
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { firstName: true, lastName: true, email: true }
          }
        }
      }),
      // Low Stock Products
      prisma.productVariant.findMany({
        where: { stock: { lte: 10 } },
        include: {
          product: {
            select: { name: true }
          }
        },
        take: 10,
        orderBy: { stock: 'asc' }
      }),
      // Top Categories (by product count)
      prisma.category.findMany({
        include: {
          _count: {
            select: { products: true }
          }
        },
        orderBy: {
          products: {
            _count: 'desc'
          }
        },
        take: 5
      })
    ]);

    // Order Volume Trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orderTrend = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('day', "createdAt") as date,
        COUNT(id) as count,
        SUM(total) as revenue
      FROM orders
      WHERE "createdAt" >= ${sevenDaysAgo}
      AND status != 'CANCELLED'
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY date ASC
    `;

    return {
      stats: {
        totalRevenue: Number(totalRevenue._sum.total) || 0,
        thisMonthRevenue: Number(thisMonthRevenue._sum.total) || 0,
        totalOrders,
        pendingOrders,
        processingOrders,
        totalUsers,
      },
      recentOrders,
      lowStockProducts: lowStockProducts.map(v => ({
        id: v.id,
        name: v.product.name,
        size: v.size,
        color: v.color,
        stock: v.stock,
        sku: v.sku
      })),
      topCategories: topCategories.map(c => ({
        name: c.name,
        count: c._count.products
      })),
      orderTrend
    };
  }
}
