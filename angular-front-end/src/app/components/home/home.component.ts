import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {ProductsService} from "../../service/product/products.service";
import {CategoriesService} from "../../service/categories/categories.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products : Product[] = [];
  categories: Category[] = [];

  constructor(
    private router: Router,
    private productService: ProductsService ,
    private categoryService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(
      resp => {
        console.log("init in home : categories get all")
        console.log("resp : " + resp);
        this.categories = resp;
      },
      error => console.log("error : " + error)
    );
  }
  getProducts(){
    this.productService.getAllProducts().subscribe(
      resp => {
        console.log("init in home : product get all")
        console.log("resp : " + resp);
        this.products = resp;
      }
    )
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/layout/product'], { queryParams: { id: productId } });
  }

}
