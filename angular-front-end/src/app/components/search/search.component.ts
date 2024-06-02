import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../service/product/products.service";
import {Product} from "../../model/product";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  products : Product[] = [];
  private productsSubscription!: Subscription;

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.productService.getProducts();
    this.productsSubscription = this.productService.products$.subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }



}
