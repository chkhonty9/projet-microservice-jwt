import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart/shopping-cart.service";
import {ShoppingCart} from "../../model/shopping-cart";
import {CartItem} from "../../model/cart-item";
import {Product} from "../../model/product";
import {ProductsService} from "../../service/product/products.service";
import {Payment} from "../../model/payment";
import {PaymentService} from "../../service/payment/payment.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cart: ShoppingCart = new ShoppingCart();
  cardNumber : string = '';

  constructor(
    private cartService: ShoppingCartService,
    private productService:ProductsService,
    private paymentService:PaymentService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    console.log('init cart component cart : ', this.cart);
  }

  deleteItem(item : CartItem){
    const shouldDelete = window.confirm("Are you sure you want to delete this item?");
    if (shouldDelete) {
      this.cartService.deleteProduct(item);
    }
  }


  totalPrice(){
    let total = 0;
    for(let item of this.cart.cartItems){
      total += item.price;
    }
    return total;
  }

  onQuantityChange(item: CartItem) {
    console.log('Quantity changed:', item.quantity);
    this.cartService.onQuantityChange(item);
  }

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    }
  }

  pay() {
    const payment : Payment = new Payment();
    payment.cardNumber = this.cardNumber;
    payment.shoppingCart = this.cart;
    payment.datePayment = new Date();
    this.paymentService.createPayment(payment).subscribe(
      resp => {
        this.cartService.pay();
        this.updateStock();
        this.cart = this.cartService.cart;
        this.closeModel();
      },
      error => console.log('error : '+error)
    )

  }

  updateStock(){
    for (let item of this.cart.cartItems){
      let product = item.product;
      product.stock -= item.quantity;
      if(product.stock == 0){
        product.available = false;
      }
      this.productService.updateProduct(product, product.id!);
    }
  }
}
