import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductsService} from "../../service/product/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];

  constructor(private productService:ProductsService,private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      } ,
      error => console.log('error : '+error)
    )
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/layout/product'], { queryParams: { id: productId } });
  }
}
