import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../service/product/products.service";
import {Product} from "../../model/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  actions : Array<any> = [
    {title : "Home", "route" : "home"},
    {title : "Categories", "route" : "categories"},
    {title: "Promo", "route" : "promo"}
  ];

  wordTosearch:any;

  constructor(private productService: ProductsService, private router: Router) {
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
}