import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../../model/category";
import {Observable} from "rxjs";
import {tokenGetter} from "../../app.module";
import {Product} from "../../model/product";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private host: string = "http://localhost:8888/CATALOGUE-SERVICE/categories";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token: string = tokenGetter()!;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    });
  }

  createCategory(category: Category): Observable<Category> {
    console.log("Category service: createCategory");
    const headers = this.getHeaders();
    return this.http.post<Category>(this.host, category, { headers });
  }

  getAllCategories(): Observable<Category[]> {
    console.log("Category service: getAllCategories");
    const headers = this.getHeaders();
    return this.http.get<Category[]>(this.host, { headers });
  }

  getCategoryById(id: string): Observable<Category> {
    console.log("Category service: getCategoryById");
    const headers = this.getHeaders();
    return this.http.get<Category>(`${this.host}/${id}`, { headers });
  }

  deleteCategory(id: string): Observable<void> {
    console.log("Category service: deleteCategory");
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.host}/${id}`, { headers });
  }

  getCategoryByName(name: string): Observable<Category> {
    console.log("Category service: getCategoryByName");
    const headers = this.getHeaders();
    return this.http.get<Category>(`${this.host}/search?name=${name}`, { headers });
  }
}
