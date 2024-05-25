import { ShoppingCart } from './shopping-cart';

export interface Payment {
  id: number;
  datePayment: Date;
  cardNumber: string;
  shoppingCart: ShoppingCart;
}
