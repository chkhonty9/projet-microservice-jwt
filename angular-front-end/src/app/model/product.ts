import { Category } from './category';

export interface Product {
  id: string;
  name: string;
  price: number;
  promotion: boolean;
  available: boolean;
  description: string;
  image: ArrayBuffer;
  stock: number;
  category: Category;
}
