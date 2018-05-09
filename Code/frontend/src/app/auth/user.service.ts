import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable()
export class UserService {
  url = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:8000/api/users');
  }

  getbyUsername(userName: String) {
    return this.http.get('http://localhost:8000/api/users?userName=' + userName);
  }

  create(user: User) {
    user.admin = true;
    return this.http.post('http://localhost:8000/api/users', user);
  }

  update(user: User) {
    return this.http.put('http://localhost:8000/api/users?userName=' + user.userName, user);
  }

  delete(user: string) {
    return this.http.delete('http://localhost:8000/api/users?userName=' + user);
  }

  getResults(userName: string) {
    return this.http.get('http://localhost:8000/api/calculate?userName=' + userName);
  }

  calculateResults(user: User) {
    return this.http.post('http://localhost:8000/api/calculate', user);
  }

}
