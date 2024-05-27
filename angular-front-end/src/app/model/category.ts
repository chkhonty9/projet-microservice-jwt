import { Product } from './product';

export class Category {
  id: string | null = null;
  name: string = '';
  description: string = '';
  image: string = '';
  products: Array<Product> = [];
  constructor() {
  }
}
