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
  private currentUser!:User;
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

  setCurrentUser(user:User){
    this.currentUser = user;
  }
  getCurrentUser(){
    return this.currentUser;
  }

}
