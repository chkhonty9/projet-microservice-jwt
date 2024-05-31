import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tokenGetter} from "../../app.module";
import {ShoppingCart} from "../../model/shopping-cart";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private host: string = "http://localhost:8888/CATALOGUE-SERVICE/shoppingCarts";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token: string = tokenGetter()!;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
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

}
