import { CartItem } from './cart-item';

export class ShoppingCart {
  id: string | null = null;
  userId: number = 0;
  total: number = 0;
  status: boolean = false;
  createdAt: Date = new Date();
  cartItems: CartItem[] = [];

  constructor() {
  }
}
