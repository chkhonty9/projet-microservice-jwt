import { ShoppingCart } from './shopping-cart';

export class Payment {
  id: number | null  = null;
  datePayment: Date = new Date();
  cardNumber: string = '';
  shoppingCart: ShoppingCart = new ShoppingCart();

 constructor() {
 }
}
