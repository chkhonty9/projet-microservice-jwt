import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {tokenGetter} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host:string="http://localhost:8888/USER-MANAGER-SERVICE";
  token: string = tokenGetter()!;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.token,
  });

  constructor(private http:HttpClient){}


  user(username:string):Observable<User>{
    console.log('token : ' + this.token );
    return this.http.get<User>(`${this.host}/user/username/${username}`, { headers: this.headers });
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put<User>(this.host+`/user/update/${id}`, user, { headers: this.headers });
  }

  users(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/admin/users`, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<void>(`${this.host}/admin/user/${id}`, { headers: this.headers });
  }

  userByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/admin/name/${name}`, { headers: this.headers });
  }

}
