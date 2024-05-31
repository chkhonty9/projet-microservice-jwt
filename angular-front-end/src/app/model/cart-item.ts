import { Product } from './product';

export class CartItem {
  id: string | null = null;
  quantity: number = 0;
  addedAt: Date = new Date();
  price: number = 0;
  product: Product = new Product();
  userId: number = 0;
  constructor() {
  }
}
