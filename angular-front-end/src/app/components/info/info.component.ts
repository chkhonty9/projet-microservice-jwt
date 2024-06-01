import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  currentUser:User;
  confirmPassword!: string;
  passwordsMatch: boolean = true;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  onSubmit(): void {
    console.log('info component : on submit');
    this.currentUser.password = this.confirmPassword;
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(
      resp =>{
        console.log("user update : " + resp.username);
      },
      error => {
        console.log('err : ' + error);
      }
    )
  }

  checkPasswordMatch(form: NgForm) {
    this.passwordsMatch = form.value.password === form.value.confirmPassword;
  }

}
