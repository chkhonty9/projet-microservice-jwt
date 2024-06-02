import { Injectable } from '@angular/core';
import {tokenGetter} from "../../app.module";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../model/product";
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../../model/category";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public readonly products$ = this._products.asObservable();products : Product[] = [];

  private host: string = "http://localhost:8888/CATALOGUE-SERVICE/products";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token: string = tokenGetter()!;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    });
  }

  createProduct(product: Product): Observable<Product> {
    console.log("Product service: createProduct");
    const headers = this.getHeaders();
    return this.http.post<Product>(`${this.host}/save`, product, { headers });
  }

  updateProduct(product: Product, id: string): Observable<Product> {
    console.log("Product service: updateProduct");
    const headers = this.getHeaders();
    return this.http.put<Product>(`${this.host}/update/${id}`, product, { headers });
  }

  getAllProducts(): Observable<Product[]> {
    console.log("Product service: getAllProducts");
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.host, { headers });
  }

  getProductById(id: string): Observable<Product> {
    console.log("Product service: getProductById");
    const headers = this.getHeaders();
    return this.http.get<Product>(`${this.host}/${id}`, { headers });
  }

  deleteProduct(id: string): Observable<void> {
    console.log("Product service: deleteProduct");
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.host}/${id}`, { headers });
  }

  getProductsByName(name: string): Observable<Product[]> {
    console.log("Product service: getProductsByName");
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.host}/search?name=${name}`, { headers });
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    console.log("Product service: getProductsByCategory");
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.host}/byCategory/${categoryId}`, { headers });
  }

  getProductsContain(name: string): Observable<Product[]> {
    console.log("Product service: getProductsContain");
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.host}/contain/${name}`, { headers });
  }

  getProductsEpuise(): Observable<Product[]> {
    console.log("Product service: getProducts not available");
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.host}/epuise`, { headers });
  }

  getProductPromo():Observable<Product[]> {
    console.log("Product service: getProducts promo");
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.host}/promo`, { headers });
  }

  getProduct(word : string){
    this.getProductsContain(word).subscribe(
      products => {
        this.updateProducts(products);
      },
      error => {
        console.log('error : ' + error);
        this.getProducts();
      }
    )
  }


  getProducts(){
    this.getAllProducts().subscribe(
      products => {
        this.updateProducts(products);
      },
      error => console.log('error : '+error)
    )
  }

  updateProducts(newProducts: Product[]): void {
    this._products.next(newProducts);
  }

}
