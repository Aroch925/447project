import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from './../auth/user.service';
import { AuthService} from './../auth/auth.service';
import { User } from './../auth/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  avatars = ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6', 'avatar7', 'avatar8', 'avatar9', 'avatar10', 'default'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      first: ['', Validators.required],
      last: ['', Validators.required],
      password: ['', Validators.required],
      about_me: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const currentUser: User = this.form.value;
      this.userService.create(this.form.value)
      .subscribe(
        data => {
          if (data['error']) {
            alert(data['error']);
          } else {
            currentUser.admin = false;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.router.navigate(['/survey']);
          }
      }
      );
    }
    this.formSubmitAttempt = true;
  }

}
