import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
import {ShoppingCart} from "../../model/shopping-cart";
import {User} from "../../model/user";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css'
})
export class MainProfileComponent implements OnInit {

  carts: ShoppingCart[] = new Array<ShoppingCart>();
  user: User = new User();

  constructor(
    private cartService: ShoppingCartService,
  ) {}

  ngOnInit(): void {
    this.cartService.getCarts();
    this.carts = this.cartService.carts;
    console.log('init main profile component : ', this.carts);
    this.user = this.cartService.user;
  }


}
