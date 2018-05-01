import { Component, OnInit } from '@angular/core';
import { User } from './../auth/user';
import { UserService } from './../auth/user.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
