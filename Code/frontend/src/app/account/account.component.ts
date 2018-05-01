import { Component, OnInit } from '@angular/core';
import { User } from './../auth/user';
import { UserService } from './../auth/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
