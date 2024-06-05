import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {ProductsService} from "../../service/product/products.service";
import {CategoriesService} from "../../service/categories/categories.service";
import {Router} from "@angular/router";
import {response} from "express";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products : Product[] = [];
  categories: Category[] = [];
  recommendation: Product[] = [];
  promos : Product [] = [];

  constructor(
    private router: Router,
    private productService: ProductsService ,
    private categoryService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getPromos();
    this.getProducts();
    this.getRecommendations();
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
        if(resp.length > 9){
          this.products = resp.slice(length - 9,length-1);
        }else {
          this.products = resp;
        }
      },
      error => console.log("error : " + error)
    )
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/layout/product'], { queryParams: { id: productId } });
  }

  getRecommendations(){
    console.log('home : recommendations ')
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
      this.productService.getProductRecommendation(user.id).subscribe(
        resp => {
          if(resp.length > 9){
            this.recommendation = resp.slice(length - 9,length-1);
          }else {
            this.recommendation = resp;
          }
          console.log("recommendation : " + resp);
        },
        error => console.log('error : '+error)
      )
    }
  }

  getPromos(){
    console.log('home : get  promo');
    this.productService.getProductPromo().subscribe(
      response => {
        if(response.length > 9){
          this.promos = response.slice(length - 9,length-1);
        }else {
          this.promos = response;
        }
        console.log("promos : " + response);
      },
      error => console.log('error : '+error)
    )
  }

}
