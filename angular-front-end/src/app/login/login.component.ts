import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user";
import {Register} from "../model/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public signupForm!: FormGroup;
  public user!: User;
  public register!: Register;

  constructor(private authService:AuthenticationService,
              private router:Router,
              private fb : FormBuilder,) {}
  ngOnInit() {

  }
  onLogin(){
    console.log('login component : onLogin function');
    this.authService.login(this.user).subscribe(resp=>{
        console.log('response : ', resp);
        this.authService.saveToken(resp.headers.get('Authorization'));
      },
      err=>{
        console.log('error : ', err)
      })
  }

  onRegister(){
    this.authService.register(this.register)
      .subscribe(data=>{
          this.user = data;
        },
        err=>{
          console.log('error : ', err)
        })
  }

}
