import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from "rxjs";
import {Register} from "../../model/register";
import {User} from "../../model/user";
import {UserService} from "../user/user.service";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host:string="http://localhost:8888/USER-MANAGER-SERVICE";
  private jwtToken:any;
  private roles:Array<any>=[];
  constructor(private http:HttpClient,private userService:UserService,private cartService:ShoppingCartService) {}

  login(user:any){
    console.log('service : login function');
    return this.http.post(this.host+`/login`,user,{ observe: 'response'});
  }

  register(register: Register): Observable<User>{
    return this.http.post<User>(this.host+"/user/register",register);
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

  saveUser() {
    console.log('service authentication : saveUser function');
    let jwtHelper = new JwtHelperService();

    const decodedToken = jwtHelper.decodeToken(this.jwtToken);

    if (decodedToken == null) {
      console.error('Failed to decode token');
      return;
    }
    const username = decodedToken.sub;

    if (username == null) {
      console.error('Token does not contain a valid username');
      return;
    }
    console.log('username : ' + username);

    this.userService.user(username).subscribe(
      user => {
        console.log('resp : ' + user.id);
        localStorage.setItem('user', JSON.stringify(user));
        //console.log('user email : ' + this.userService.getCurrentUser().email);
        this.cartService.instanceCart();
        this.cartService.getCarts();
      },
      err => {
        console.log('error : ', err);
      }
    );
  }


  loadToken(){
    this.jwtToken=localStorage.getItem('token');
    return this.jwtToken;
  }


  isAdmin(){
    for(let r of this.roles){
      if(r =='ADMIN') return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
