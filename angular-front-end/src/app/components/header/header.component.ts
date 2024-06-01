import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  actions : Array<any> = [
    {title : "Home", "route" : "home"},
    {title : "Categories", "route" : "categories"},
    {title: "Promo", "route" : "promo"}
  ];

  constructor() {
  }

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }

}
