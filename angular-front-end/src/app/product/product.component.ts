import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../service/product/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../model/product";
import {Category} from "../model/category";
import {CartItem} from "../model/cart-item";
import {CartItemsService} from "../service/cart-item/cart-items.service";
import {ShoppingCartService} from "../service/shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  cartItem : CartItem = new CartItem();
  product: Product = new Product();
  products: Product[] = [];
  quantity : number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService : ProductsService,
    private cartItemService : CartItemsService,
    private shoppingCartService : ShoppingCartService
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.getProduct(params['id'] ?? ' ');
      this.getProducts(this.product.category);
    });
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
