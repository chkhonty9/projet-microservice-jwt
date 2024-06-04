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

  carts: ShoppingCart[] = [];
  user: User = new User();

  constructor(
    private cartService: ShoppingCartService,
  ) {}

  ngOnInit(): void {
    this.carts = this.cartService.carts;
    console.log('init main profile component : ', this.carts);
    this.user = this.cartService.user;
  }


  cancel(id: string | null) {
    const shouldConcel = window.confirm("Are you sure you want to cancel this item?");
    if (shouldConcel) {
      this.cartService.deleteShoppingCart(id!).subscribe(
        resp => {
          console.log('deleted : ', resp);
          this.cartService.instanceCart();
          this.cartService.getCarts();
          let index = this.carts.findIndex(
            x => x.id == id
          );
          this.carts.splice(index, 1);
        },
        error => console.log('error',error)
      )
    }
  }
}
