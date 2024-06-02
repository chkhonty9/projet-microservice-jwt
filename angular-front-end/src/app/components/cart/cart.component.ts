import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
import {CartItemsService} from "../../service/cart-item/cart-items.service";
import {ShoppingCart} from "../../model/shopping-cart";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../model/cart-item";
import {User} from "../../model/user";
import {UserService} from "../../service/user/user.service";

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


  totalPrice(){
    let total = 0;
    for(let item of this.cart.cartItems){
      total += item.price;
    }
    return total;
  }

}
