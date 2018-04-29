import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable()
export class UserService {
  url = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  create(user: User) {
    // console.log(user);
    return this.http.post('http://localhost:8000/api/users', user);
  }
}
