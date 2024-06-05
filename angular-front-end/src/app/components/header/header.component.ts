import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../service/product/products.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/auth/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  actions : Array<any> = [
    {title : "Home", "route" : "home"},
    {title : "Products", "route" : "products"},
    {title : "Categories", "route" : "categories"},
    {title: "Promo", "route" : "promo"},
    {title : "Recommendation", "route" : "recommendation"}
  ];

  wordTosearch:any;

  constructor(private productService: ProductsService,private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getProducts();
  }

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  onInputChange($event: Event) {
    const inputElement = event!.target as HTMLInputElement;
    if (!inputElement.value) {
      console.log('Input cleared');
      this.getProducts();
    }
  }

  getProduct(){
    this.navigateToSearch();
    if(this.wordTosearch == undefined){
      this.getProducts();
    }
    console.log("manager product component  get product : ", this.wordTosearch);
    this.productService.getProduct(this.wordTosearch);
  }


  getProducts(){
    console.log("manager product component  get products: ");
    this.productService.getProducts();
  }

  navigateToSearch(): void {
    this.router.navigate(['/layout/search']);
  }

  isRoute(route:any){
    return this.router.url.includes(route);

  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
