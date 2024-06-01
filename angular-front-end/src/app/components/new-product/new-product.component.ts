import {Component, OnInit} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {ProductsService} from "../../service/product/products.service";
import {CategoriesService} from "../../service/categories/categories.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  product: Product = new Product();
  selectedFileName: string = '';
  categories: Array<Category> = [];

  constructor(private productService:ProductsService, private categoryService : CategoriesService) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      resp => {
        console.log('resp : ' + resp);
        this.categories = resp;
        console.log('categories length : ' + this.categories.length);
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file.name;
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.product.image = reader.result as string;
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }


  save() {
    console.log("new product component : save");
    //this.product.id = uuidv4();
    console.log("this product category is : " + this.product.category.name);
    this.productService.createProduct(this.product).subscribe(
      resp =>{
        console.log('Response : ' + resp.name);
        this.addProductToCategory(resp, resp.category);
        this.product = new Product();
      },
      error => console.log("err : " + error)
    )
  }

  addProductToCategory(product: Product, category: Category): void {
    if (category && category.products) {
      if (!category.products.some(p => product.id === p.id)) {
        category.products.push(product);
        this.categoryService.createCategory(category).subscribe(
          (resp: Category) => {
            console.log('Product added. Number of products in category:', resp.products.length);
          },
          (error: any) => {
            console.error('Error adding product to category:', error);
          }
        );
      } else {
        console.log('Product already exists in the category.');
      }
    } else {
      console.error('Category or category products are undefined.');
    }
  }




}
