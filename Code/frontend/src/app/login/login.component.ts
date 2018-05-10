import { Component, OnInit } from '@angular/core';
import { AuthService} from './../auth/auth.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (localStorage.getItem('currentUser') !== null) {
      this.authService.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.authService.login(this.form.value)
      .subscribe( res => {
        if (res['success']) {
          this.loading = false;
          this.authService.loggedIn.next(true);
          localStorage.setItem('currentUser', JSON.stringify(this.form.value));
          window.location.reload();
          this.router.navigate(['/']);
        } else {
          this.loading = false;
          alert(res['error']);
        }
      });
    }
    this.formSubmitAttempt = true;
  }
}
