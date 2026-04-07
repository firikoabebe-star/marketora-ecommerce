import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();
const analyticsController = new AnalyticsController();

router.get('/dashboard', authenticate, authorize('ADMIN'), analyticsController.getDashboardStats);

export default router;
