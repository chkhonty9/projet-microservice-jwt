import { CartItem } from './cart-item';

export interface ShoppingCart {
  id: string;
  userId: number;
  total: number;
  status: boolean;
  createdAt: Date;
  cartItems: CartItem[];
}
