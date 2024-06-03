import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
import {ShoppingCart} from "../../model/shopping-cart";
import {CartItem} from "../../model/cart-item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cart: ShoppingCart = new ShoppingCart();

  constructor(
    private cartService: ShoppingCartService,
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    console.log('init cart component cart : ', this.cart);
  }

  deleteItem(item : CartItem){
    this.cartService.deleteProduct(item);
  }


  totalPrice(){
    let total = 0;
    for(let item of this.cart.cartItems){
      total += item.price;
    }
    return total;
  }

  onQuantityChange(item: CartItem) {
    console.log('Quantity changed:', item.quantity);
    this.cartService.onQuantityChange(item);
  }
}
