import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { UserService} from './../auth/user.service';
import { User } from './../auth/user';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  isLoggedIn$: Observable<boolean>;
  currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      question1: ['', Validators.required],
      question2: ['', Validators.required],
      question3: ['', Validators.required],
      question4: ['', Validators.required],
      question5: ['', Validators.required]
    });
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.currentUser.question1 = this.form.value['question1'];
      this.currentUser.question2 = this.form.value['question2'];
      this.currentUser.question3 = this.form.value['question3'];
      this.currentUser.question4 = this.form.value['question4'];
      this.currentUser.question5 = this.form.value['question5'];
      this.userService.update(this.currentUser).subscribe(
        data => {
          console.log(data);
        }
      );
      this.userService.calculateResults(this.currentUser)
      .subscribe( res => {
          if (res['success']) {
            this.loading = false;
            this.authService.loggedIn.next(true);
            this.router.navigate(['/']);
          } else {
            this.loading = false;
            alert(res['error']);
          }
        }
      );
    }
    this.formSubmitAttempt = true;
  }
}
