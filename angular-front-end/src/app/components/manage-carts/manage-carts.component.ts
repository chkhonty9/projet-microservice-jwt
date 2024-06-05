import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
import {ShoppingCart} from "../../model/shopping-cart";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-manage-carts',
  templateUrl: './manage-carts.component.html',
  styleUrl: './manage-carts.component.css'
})
export class ManageCartsComponent implements OnInit{

  carts: ShoppingCart[] = [];

  constructor(private shoppingCartService: ShoppingCartService, private userService : UserService){}

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts(){
    this.shoppingCartService.getAllShoppingCarts().subscribe(
      resp =>{
        this.carts = resp;
      },
      error => console.log('error : '+error)
    )
  }


  delete(id: string | null) {
    const shouldConcel = window.confirm("Are you sure you want to delete this item?");
    if (shouldConcel) {
      this.shoppingCartService.deleteShoppingCart(id!).subscribe(
        resp => {
          console.log('deleted : ', resp);
          this.shoppingCartService.instanceCart();
          this.shoppingCartService.getCarts();
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
