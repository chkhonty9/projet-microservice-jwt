import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductsService} from "../../service/product/products.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {

  products: Product[] = [];
  wordTosearch:any;

  constructor(private productService: ProductsService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  deleteItem(product: Product) {
    this.productService.deleteProduct(product.id!);
    let index = this.products.findIndex(p => p.id === product.id);
    this.products.splice(index, 1);
  }

  getProduct(){
    if(this.wordTosearch == undefined){
      this.getProducts();
    }
    console.log("manager product component  get product : ", this.wordTosearch);
    this.productService.getProductsContain(this.wordTosearch).subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.log('error : ' + error);
        this.getProducts();
      }
    )
  }


  getProducts(){
    console.log("manager product component  get products: ");
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      },
      error => console.log('error : '+error)
    )
  }

  getEpuiseProducts() {
    console.log("manager product component get product not available: ");
    this.productService.getProductsEpuise().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.log('error : ' + error);
      }
    )
  }

  onInputChange($event: Event) {
    const inputElement = event!.target as HTMLInputElement;
    if (!inputElement.value) {
      console.log('Input cleared');
      this.getProducts();
    }
  }

}
