import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from './../auth/user';
import { UserService } from './../auth/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

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
      avatar: null
    });
    this.userService.getbyUsername(this.currentUser.userName).subscribe(
      data => {
        this.currentUser.first = data['first'];
        this.currentUser.last = data['last'];
        this.currentUser.password = data['password'];
        this.currentUser.userName = data['userName'];
      }
    );

  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onSubmit() {
    if (this.form.valid) {
      // console.log(this.form.value);
      this.userService.update(this.form.value).subscribe(
        data => {
          console.log(data);
        }
      );
    }
    this.formSubmitAttempt = true;
  }

}
