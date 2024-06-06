import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
import {ShoppingCart} from "../../model/shopping-cart";
import {response} from "express";

@Component({
  selector: 'app-not-delivered-carts',
  templateUrl: './not-delivered-carts.component.html',
  styleUrl: './not-delivered-carts.component.css'
})
export class NotDeliveredCartsComponent implements OnInit{
  carts: ShoppingCart[] = [];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts(){
    this.shoppingCartService.getCartNotDelivered().subscribe(
      response => {
        this.carts = response;
        console.log("carts : ", this.carts);
      },
      error => console.log('error : ' + error)
    )
  }


  delivery(cart: ShoppingCart) {
    cart.delivered = true;
    this.shoppingCartService.createShoppingCart(cart).subscribe(
      response => {
        console.log('resp :' + response);
        let elem = this.carts.findIndex(c => c.id === cart.id);
        this.carts.splice(elem, 1);
      },
      error => console.log('error : ' + error)
    )
  }
}
