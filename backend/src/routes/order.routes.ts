import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();
const orderController = new OrderController();

router.use(authenticate);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/all', authorize('ADMIN'), orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/status', authorize('ADMIN'), orderController.updateOrderStatus);

export default router;
