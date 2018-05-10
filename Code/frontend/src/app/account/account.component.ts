import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from './../auth/user';
import { UserService } from './../auth/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  public loading = false;

  avatars = ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6', 'avatar7', 'avatar8', 'avatar9', 'avatar10', 'default'];

  uploader: FileUploader = new FileUploader({url: 'http://http://localhost:8000/api/upload'});
  fileurl;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      about_me: ['', Validators.nullValidator],
      avatar:  ['']
    });
    this.userService.getbyUsername(this.currentUser.userName).subscribe(
      data => {
        this.currentUser.first = data['first'];
        this.currentUser.last = data['last'];
        this.currentUser.password = data['password'];
        this.currentUser.userName = data['userName'];
        this.currentUser.about_me = data['about_me'];
        this.currentUser.avatar = data['avatar'];
      }
    );
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.fileurl = response;
      console.log(response);
    };
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      // console.log(this.form.value);
      this.userService.update(this.form.value).subscribe(
        data => {
          if (data['success']) {
            this.getData();
            this.loading = false;
          } else {
            this.loading = false;
            alert(data['error']);
          }
        }
      );
    }
    this.formSubmitAttempt = true;
  }
  getData() {
    this.userService.getbyUsername(this.currentUser.userName).subscribe(
      data => {
        this.currentUser.first = data['first'];
        this.currentUser.last = data['last'];
        this.currentUser.password = data['password'];
        this.currentUser.userName = data['userName'];
        this.currentUser.about_me = data['about_me'];
      }
    );
  }
}
