import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CartItemsService} from "../../service/cart-item/cart-items.service";
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
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
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productService : ProductsService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['id'] || '';
    });
    this.getCategories();
    this.loadProducts();
    /*if(this.categoryId != ''){
      this.getProducts(this.categoryId);
    }else{
      this.getProducts(this.categories[0].id!);
    }*/

  }
  loadProducts() {
    this.isLoading = true;
    if (this.categoryId !== '') {
      this.getProducts(this.categoryId);
    } else if (this.categories.length > 0) {
      this.getProducts(this.categories[0].id!);
    }
  }

  getProducts(category: string) {
    this.productService.getProductsByCategory(category).subscribe(
      products => {
        console.log('products = '+products);
        this.products = products;
        this.isLoading = false;
      },
      error => {
        console.log('error : ' + error);
        this.isLoading = false;
      }
    )
  }

  getCategories(){
    this.categoriesService.getAllCategories().subscribe(
      categories => {
        console.log('categories : category component ');
        this.categories = categories;
      },
      error => console.log('error : '+error)
    )
  }
  onCategoryChange() {
    this.getProducts(this.categoryId);
  }

}
