import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host:string="http://localhost:8888/USER-MANAGER-SERVICE";
  private jwtToken:any;
  private roles:Array<any>=[];
  constructor(private http:HttpClient){}

  login(user:any){
    console.log('service : login function');
    return this.http.post(this.host+`/login`,user,{ observe: 'response'});
  }

  register(user:any){
    return this.http.post(this.host+"/user/register",user);
  }
  saveToken(jwtToken:any){
    console.log('service : save token function');
    this.jwtToken=jwtToken;
    localStorage.setItem("token",jwtToken);
    console.log('token : ', localStorage.getItem('token'));
    let jwtHelper=new JwtHelperService();
    this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
    console.log('role : ', this.roles);
  }

  loadToken(){
    this.jwtToken=localStorage.getItem('token');
    return this.jwtToken;
  }


  isAdmin(){
    for(let r of this.roles){
      if(r.authority=='ADMIN') return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
  }

}
