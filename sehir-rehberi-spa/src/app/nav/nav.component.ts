import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  constructor(private authService : AuthService) { }
  loginUser : any = {};
  isAuthenticated = false;

  ngOnInit() {
  }

  login(){
    this.authService.login(this.loginUser);
    this.isAuthenticated = true;
  }

  logOut(){
    this.authService.logOut();
    this.isAuthenticated = false;
  }
}
