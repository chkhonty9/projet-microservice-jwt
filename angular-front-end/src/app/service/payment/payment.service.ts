import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tokenGetter} from "../../app.module";
import {Payment} from "../../model/payment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private host: string = "http://localhost:8888/CATALOGUE-SERVICE/payments";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token: string = tokenGetter()!;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    });
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.host, payment, { headers: this.getHeaders() });
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.host}/${id}`, { headers: this.getHeaders() });
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.host, { headers: this.getHeaders() });
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/${id}`, { headers: this.getHeaders() });
  }
}
