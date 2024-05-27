import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../service/product/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../model/product";
import {Category} from "../model/category";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  product: Product = new Product();
  products: Product[] = [];

  constructor(private route: ActivatedRoute,private productService : ProductsService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.getProduct(params['id'] ?? '');
    });

    this.getProducts(this.product.category);
  }

  private getProduct(productId: string) {
    this.productService.getProductById(productId).subscribe(
      product => {
        this.product = product;
        console.log('get product : '+this.product.name);
      },
      error => console.log('error : '+error)
    )
  }

  getProducts(category: Category) {
    this.productService.getProductsByCategory(category.id!).subscribe(
      products => {
        console.log('products = '+products);
        this.products = products;
      },
      error => console.log('error : '+error)
    )
  }



}
