import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../../service/categories/categories.service";
import {Category} from "../../model/category";
import {ProductsService} from "../../service/product/products.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  categoryId: string = '';
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productService : ProductsService,
  ) {}

  ngOnInit() {
    this.getCategories();
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['id'];
      this.loadProducts();
    });
    /*if(this.categoryId != ''){
      this.getProducts(this.categoryId);
    }else{
      this.getProducts(this.categories[0].id!);
    }*/

  }
  loadProducts() {
    if(this.categoryId){
      this.getProducts(this.categoryId);
    }else{
      this.getProducts(this.categories[0].id!);
    }
  }

  getProducts(category: string) {
    this.productService.getProductsByCategory(category).subscribe(
      products => {
        console.log('products = '+products);
        this.products = products;
      },
      error => {
        console.log('error : ' + error);
      }
    )
  }

  getCategories(){
    this.categoriesService.getAllCategories().subscribe(
      categories => {
        console.log('categories : category component ');
        this.categories = categories;
        this.getProducts(this.categories[0].id!);
      },
      error => console.log('error : '+error)
    )
  }
  onCategoryChange() {
    this.getProducts(this.categoryId);
  }

}
