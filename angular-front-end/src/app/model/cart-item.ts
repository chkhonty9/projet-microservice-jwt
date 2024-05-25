import { Product } from './product';

export interface CartItem {
  id: string;
  quantity: number;
  addedAt: Date;
  price: number;
  product: Product;
}
