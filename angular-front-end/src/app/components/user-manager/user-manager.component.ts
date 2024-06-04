import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements OnInit{
  users : User[] = [];
  wordToSearch: any;

  constructor(private userService : UserService, private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsersByName(){
    console.log('users by name component : ')
    this.userService.userByName(this.wordToSearch).subscribe(
      users => {
        this.users = users;
      },
      error => {
        this.toastr.error('no user found');
        console.log('error : '+error)
      }
    )
  }

  getUsers(){
    console.log('users component : ')
    this.userService.users().subscribe(
      users =>{
        this.users = users;
      },
      error => console.log('error : '+error)
      )
  }

  onInputChange($event: Event) {
    const inputElement = event!.target as HTMLInputElement;
    if (!inputElement.value) {
      console.log('Input cleared');
      this.getUsers();
    }
  }

  delete(id: number | null) {
    const resp = window.confirm('Are you sure you want to delete this user?');
    if(resp){
      console.log('delete', id);
      this.userService.delete(id!).subscribe(
        response => {
          console.log('resp : ', response);
          this.getUsers();
        },
        error => console.log('error : '+error)
      )
    }
  }
}
