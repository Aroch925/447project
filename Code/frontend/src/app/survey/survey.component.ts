import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  selected = 'option2';
  selected1 = 'option2';
  selected2 = 'option2';

  form: FormGroup;
  private formSubmitAttempt: boolean;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({

    });
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.loggedIn.next(true);
      this.router.navigate(['/']);
    }
    this.formSubmitAttempt = true;
  }

}
