import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartItem} from "../../model/cart-item";
import {Product} from "../../model/product";
import {ProductsService} from "../../service/product/products.service";
import {CartItemsService} from "../../service/cart-item/cart-items.service";
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
import {Category} from "../../model/category";
import {User} from "../../model/user";


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
  user : User = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private route: ActivatedRoute,
    private productService : ProductsService,
    private cartItemService : CartItemsService,
    private cartService: ShoppingCartService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.getProduct(params['id'] ?? ' ');
    });
  }

  private getProduct(productId: string) {
    this.productService.getProductById(productId).subscribe(
      product => {
        this.product = product;
        console.log('get product : '+this.product.name);
        this.getProducts(this.product.category);
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


  addToCart() {
    console.log('add to cart');
    this.cartItem.product = this.product;
    this.cartItem.userId = this.user.id!;
    this.cartItem.quantity = this.quantity;
    this.cartItem.addedAt = new Date();
    this.cartItem.price = this.product.price * this.quantity;
    this.newItem();
  }

  newItem(){
    console.log('new Item : ');
    this.cartItemService.createCartItem(this.cartItem).subscribe(
      resp => {
        this.cartItem = resp;
        console.log('item : ', this.cartItem.id);
        this.cartService.addItemCart(this.cartItem);
        this.navigateToCart();
    },
      error => console.log('error:',error)
    )

  }

  navigateToCart(): void {
    this.router.navigate(['/layout/cart']);
  }


}
