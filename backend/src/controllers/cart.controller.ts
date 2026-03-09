import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { CartService } from '../services/cart.service';

const cartService = new CartService();

export class CartController {
  async getCart(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cart = await cartService.getCart(req.user!.userId);

      res.status(200).json({
        status: 'success',
        data: { cart },
      });
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cart = await cartService.addToCart(req.user!.userId, req.body);

      res.status(200).json({
        status: 'success',
        data: { cart },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cart = await cartService.updateCartItem(
        req.user!.userId,
        req.params.itemId,
        req.body.quantity
      );

      res.status(200).json({
        status: 'success',
        data: { cart },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cart = await cartService.removeFromCart(req.user!.userId, req.params.itemId);

      res.status(200).json({
        status: 'success',
        data: { cart },
      });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cart = await cartService.clearCart(req.user!.userId);

      res.status(200).json({
        status: 'success',
        data: { cart },
      });
    } catch (error) {
      next(error);
    }
  }
}
