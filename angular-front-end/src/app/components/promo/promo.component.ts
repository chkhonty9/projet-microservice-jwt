import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../service/product/products.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrl: './promo.component.css'
})
export class PromoComponent implements OnInit{

  products : Product[] = [];

  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    console.log("product promo component : ")
    this.productService.getProductPromo().subscribe(
      products => {
        this.products = products;
      },
      error => console.log('error : '+error)
    )
  }

}
