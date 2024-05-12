import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Register} from "../model/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public signupForm!: FormGroup;
  public user: any = {username : '', password : ''};
  public register!: Register;

  constructor(private authService:AuthenticationService,
              private router:Router,
              private fb : FormBuilder,) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username : this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
    this.signupForm = this.fb.group({
      username : this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      repassword : this.fb.control('', [Validators.required]),
      name : this.fb.control('', [Validators.required]),
      email : this.fb.control('', [Validators.required]),
      address : this.fb.control('', [Validators.required]),
      phoneNumber : this.fb.control('', [Validators.required]),
    })
  }
  onLogin(){
    console.log('login component : onLogin function');
    this.user = this.loginForm.value;
    this.authService.login(this.user).subscribe(resp=>{
        console.log('response : ', resp);
        this.authService.saveToken(resp.headers.get('Authorization'));
      },
      err=>{
        console.log('error : ', err)
      })
  }

  onRegister(){
    this.register = this.signupForm.value;
    this.authService.register(this.register)
      .subscribe(data=>{
          this.user = data;
        },
        err=>{
          console.log('error : ', err)
        })
  }

}
