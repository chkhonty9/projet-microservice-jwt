import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/auth/authentication.service";
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Register} from "../../model/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public user: any = {username : '', password : ''};

  constructor(private authService:AuthenticationService,
              private router:Router,
              private fb : FormBuilder,) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username : this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }
  onLogin(){
    console.log('login component : onLogin function');
    this.user = this.loginForm.value;
    this.authService.login(this.user).subscribe(resp=>{
        console.log('response : ', resp);
        this.authService.saveToken(resp.headers.get('Authorization'));
        localStorage.setItem("isAdmin", this.authService.isAdmin().toString());
        this.router.navigateByUrl('layout');
      },
      err=>{
        console.log('error : ', err)
      })
  }

}
