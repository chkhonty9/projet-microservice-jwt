import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/auth/authentication.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  constructor(private authService: AuthenticationService,) {
  }

  ngOnInit(): void {
    this.authService.saveUser();
  }


}

