import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isAdmin: boolean = false;
  actions: Array<any> = [];

  constructor( private router: Router) {
  }


  ngOnInit(): void {
    const isAdminStored = localStorage.getItem('isAdmin');
    this.isAdmin = isAdminStored === 'true';
    console.log(`isAdmin: ${this.isAdmin}`);
    this.initializeActions();
  }

  initializeActions(): void {
    this.actions = [
      { title: "Profile", route: "info", authorized: true },
      { title: "New product", route: "new-product", authorized: this.isAdmin },
      { title: "New category", route: "new-category", authorized: this.isAdmin },
      { title: "Manage product", route: "manage-product", authorized: this.isAdmin },
      { title: "Manage category", route: "manage-categories", authorized: this.isAdmin }
    ];
  }

  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  isRoute(route:any){
    return this.router.url.includes(route);

  }
}
