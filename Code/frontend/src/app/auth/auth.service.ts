import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';


@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isAdmin() {
    return this.admin.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.http.post('http://localhost:8000/api/authenticate', user)
      .subscribe(
        data => {
          if (data['success']) {
            this.loggedIn.next(true);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/']);
          } else {
            alert(data['error']);
          }
        }
      );
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}