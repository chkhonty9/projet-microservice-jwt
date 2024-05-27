import { Category } from './category';

export class Product {
  id: string | null = null;
  name: string = '';
  price: number = 0;
  promotion: boolean = false;
  available: boolean = true;
  description: string = '';
  image: string = '';
  stock: number = 0;
  category: Category = new Category();
  constructor() {
  }
}
