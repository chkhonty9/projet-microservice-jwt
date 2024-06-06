import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tokenGetter} from "../../app.module";
import {ShoppingCart} from "../../model/shopping-cart";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {CartItem} from "../../model/cart-item";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{
  private host: string = "http://localhost:8888/CATALOGUE-SERVICE/shoppingCarts";

  cart: ShoppingCart = new ShoppingCart();
  user:User = new User();
  carts: ShoppingCart[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.instanceCart();
    this.getCarts();
  }

  private getHeaders(): HttpHeaders {
    const token: string = tokenGetter()!;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    });
  }

  createShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    console.log("Shopping cart service: createShoppingCart");
    return this.http.post<ShoppingCart>(this.host, shoppingCart, { headers: this.getHeaders() });
  }

  getShoppingCartById(id: string): Observable<ShoppingCart> {
    console.log("Shopping cart service: getShoppingCartById");
    return this.http.get<ShoppingCart>(`${this.host}/${id}`, { headers: this.getHeaders() });
  }

  getAllShoppingCarts(): Observable<ShoppingCart[]> {
    console.log("Shopping cart service: getAllShoppingCarts");
    return this.http.get<ShoppingCart[]>(this.host, { headers: this.getHeaders() });
  }

  deleteShoppingCart(id: string): Observable<void> {
    console.log("Shopping cart service: deleteShoppingCart");
    return this.http.delete<void>(`${this.host}/${id}`, { headers: this.getHeaders() });
  }

  getUnpaidShoppingCartByUserId(userId: number): Observable<ShoppingCart> {
    console.log("Shopping cart service: getUnpaidShoppingCartByUserId");
    return this.http.get<ShoppingCart>(`${this.host}/notPayed/${userId}`, { headers: this.getHeaders() });
  }

  getShoppingCartsByUserId(userId: number): Observable<ShoppingCart[]> {
    console.log("Shopping cart service: getShoppingCartsByUserId");
    return this.http.get<ShoppingCart[]>(`${this.host}/user/${userId}`, { headers: this.getHeaders() });
  }

  getCartNotDelivered(): Observable<ShoppingCart[]> {
    console.log("Shopping cart service: get not delivered Carts");
    return this.http.get<ShoppingCart[]>(this.host+'/notDelivered', { headers: this.getHeaders() });
  }

  instanceCart() {
    console.log('instance cart : ');

    if (typeof window !== 'undefined') {
      this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    }

    console.log('user : ' + this.user);

    if (this.user && this.user.id) { // Check if this.user and this.user.id are not null
      this.getUnpaidShoppingCartByUserId(this.user.id).subscribe(
        resp => {
          this.cart = resp;
        },
        error => {
          console.log('error: ' + error);
          this.cart = new ShoppingCart();
          this.cart.userId = this.user.id!;
        }
      );
    } else {
      console.log('User is null or does not have an ID.');
      // Handle the case where user or user.id is null
    }
  }


  addItemCart(item : CartItem){
    console.log('service : add to cart');
    //this.cart.userId = this.user.id!;
    if(this.isExisted( item)){
      console.log('finding item');
      let index = this.cart.cartItems.findIndex(
        x => x.product.id == item.product.id
      );
      this.cart.cartItems[index].quantity += item.quantity;
      this.cart.cartItems[index].price *=  this.cart.cartItems[index].quantity;
    } else {
      console.log('pushing item');
      this.cart.cartItems.push(item);
    }
    console.log(this.cart.cartItems);
    this.saveCart();
  }

  isExisted(item : CartItem){
    let elem : CartItem | undefined = this.cart.cartItems.find(x => x.product.id == item.product.id);
    if(elem == undefined)
      return false;
    else
      return true;
  }

  onQuantityChange(item: CartItem){
    let index = this.cart.cartItems.findIndex(
      x => x.product.id == item.product.id
    );
    this.cart.cartItems[index].quantity = item.quantity;
    this.cart.cartItems[index].price = item.product.price * item.quantity;
    this.saveCart();
    return this.cart;
  }

  deleteProduct(item: CartItem) {
    let index = this.cart.cartItems.findIndex(
      x => x.product.id == item.product.id
    );
    this.cart.cartItems.splice(index,1);
    this.saveCart();
  }

  saveCart(){
    console.log('saving cart');
    console.log('cart user id ', this.cart.userId);
    this.cart.total = this.totalPrice();
    this.createShoppingCart(this.cart).subscribe(
      resp=>{
        console.log('resp of new save cart ', resp);
        this.cart = resp;
        this.getCarts();
        console.log('cart : ', this.cart.id);
      },
      error => console.log('error : ', error)
    )
  }

  getCarts(){
    console.log('get carts : ');
    if (typeof window !== 'undefined') {
      this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    }

    //console.log('user id : ', this.user.id);
    if(this.user && this.user.id){
      this.getShoppingCartsByUserId(this.user.id!).subscribe(
        carts => {
          this.carts = carts.reverse();
        },
        error => console.log('error : '+error)
      )
    }
  }

  pay(){
    this.cart.status = true;
    this.saveCart();
    this.instanceCart();
    this.router.navigate(['/layout/home']);
  }

  totalPrice(){
    let total = 0;
    for(let item of this.cart.cartItems){
      total += item.price;
    }
    return total;
  }


}
