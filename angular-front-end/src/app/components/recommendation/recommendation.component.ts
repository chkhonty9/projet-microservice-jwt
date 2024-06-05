import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductsService} from "../../service/product/products.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent implements OnInit{
  products: Product[] = [];
  user:User = new User();

  constructor(private productService:ProductsService,private router: Router) {
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    }
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProductRecommendation(this.user.id!).subscribe(
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
