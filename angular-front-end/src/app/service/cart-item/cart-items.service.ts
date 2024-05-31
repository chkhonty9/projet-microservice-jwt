import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tokenGetter} from "../../app.module";
import {CartItem} from "../../model/cart-item";
import {Observable} from "rxjs";
import {Product} from "../../model/product";

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private host: string = "http://localhost:8888/CATALOGUE-SERVICE/cartItems";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token: string = tokenGetter()!;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    });
  }

  createCartItem(cartItem: CartItem): Observable<CartItem> {
    console.log("Category service: createCartItem");
    return this.http.post<CartItem>(this.host, cartItem, { headers: this.getHeaders() });
  }

  getCartItemById(id: string): Observable<CartItem> {
    console.log("Category service: getCartItemById");
    return this.http.get<CartItem>(`${this.host}/${id}`, { headers: this.getHeaders() });
  }

  getAllCartItems(): Observable<CartItem[]> {
    console.log("Category service: getAllCartItems");
    return this.http.get<CartItem[]>(this.host, { headers: this.getHeaders() });
  }

  deleteCartItem(id: string): Observable<void> {
    console.log("Category service: deleteCartItem");
    return this.http.delete<void>(`${this.host}/${id}`, { headers: this.getHeaders() });
  }

  getCartItemsByUserId(userId: number): Observable<CartItem[]> {
    console.log("Category service: getCartItemsByUserId");
    return this.http.get<CartItem[]>(`${this.host}/user/${userId}`, { headers: this.getHeaders() });
  }

  getCartItemsByProduct(product: Product): Observable<CartItem[]> {
    console.log("Category service: getCartItemsByProduct ");
    return this.http.post<CartItem[]>(`${this.host}/product`, product, { headers: this.getHeaders() });
  }

}
