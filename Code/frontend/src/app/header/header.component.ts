import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../auth/user';
import { UserService } from './../auth/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    .mat-elevation-z5 {
      position: relative;
      z-index: 2;
   }
    `
  ]
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isAdmin: boolean;
  currentUser: User;
  avatar: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getImage();
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

  retakeSurvey() {
    this.router.navigate(['/survey']);
  }

  getImage() {
    if (localStorage.getItem('currentUser') === null) {
      this.avatar = 'default';
    } else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userService.getbyUsername(this.currentUser.userName).subscribe(data => {
        this.avatar = data['avatar'];
        this.isAdmin = data['admin'];
      });
    }
  }

}
