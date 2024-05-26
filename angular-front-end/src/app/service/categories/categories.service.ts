import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../../model/category";
import {Observable} from "rxjs";
import {tokenGetter} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private host:string="http://localhost:8888/CATALOGUE-SERVICE";
  token: string = tokenGetter()!;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.token,
  });

  constructor(private http: HttpClient) { }

  save(category:Category):Observable<Category>{
    console.log("category service : save");
    return this.http.post<Category>(this.host+`/categories`,category, { headers: this.headers });
  }

  update(category:Category, id:string):Observable<Category>{
    console.log("category service : update");
     return this.http.put<Category>(`${this.host}/categories/${id}`, category, { headers: this.headers });
  }

  getAll(): Observable<Category[]>{
    console.log("category service : getAll");
    return this.http.get<Category[]>(`${this.host}/categories`, { headers: this.headers });
  }

  getById(id:number):Observable<Category>{
    console.log("category service : get by id");
    return this.http.get<Category>(`${this.host}/categories/${id}`, { headers: this.headers });
  }

  getByName(name:string):Observable<Category>{
    console.log("category service : get by name");
    return this.http.get<Category>(`${this.host}/categories/${name}`, { headers: this.headers });
  }
}
