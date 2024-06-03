import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Register} from "../../model/register";
import {User} from "../../model/user";
import {AuthenticationService} from "../../service/auth/authentication.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  public signupForm!: FormGroup;
  public register: Register = new Register();
  public user : User = new User();

  constructor(private authService:AuthenticationService,
              private router:Router,
              private fb : FormBuilder,) {}

  ngOnInit(){
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

  onRegister(){
    if (this.signupForm.invalid) {
      return;
    }
    this.register = this.signupForm.value;
    this.authService.register(this.register).subscribe(
      data => {
        this.user = data;
        console.log('user : ',this.user);
        this.router.navigate(['/login']);
      },
      err => {
        console.log('error : ', err);
      }
    );
  }

}
