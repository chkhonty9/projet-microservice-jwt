import { Component } from '@angular/core';
import {AuthenticationService} from "../service/auth/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  actions : Array<any> = [
    {title : "Home", "route" : "home"},
    {title : "Categories", "route" : "categories"},
  ];

  constructor() {
  }

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }

}
