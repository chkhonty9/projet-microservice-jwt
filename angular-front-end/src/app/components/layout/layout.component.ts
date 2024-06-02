import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/auth/authentication.service";
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  constructor(private authService: AuthenticationService,private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.authService.saveUser();
  }


}

