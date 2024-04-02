import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  obj : any = {
    username : 'admin',
    password : '12345678'
  };
  constructor(private authService:AuthenticationService,
              private router:Router) {}
  ngOnInit() {

  }
  onLogin(){
    console.log('login component : onLogin function');
    this.authService.login(this.obj).subscribe(resp=>{
        console.log('response : ', resp);
        this.authService.saveToken(resp.headers.get('Authorization'));
      },
      err=>{
        console.log('error : ', err)
      })
  }

}
