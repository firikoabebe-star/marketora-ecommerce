import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.use(authenticate, authorize('ADMIN'));

router.get('/', userController.getUsers);
router.patch('/:id/role', userController.updateUserRole);
router.delete('/:id', userController.deleteUser);

export default router;
