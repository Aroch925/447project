import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../auth/user';
import { UserService } from '../../auth/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  editUser: User = JSON.parse(localStorage.getItem('currentUser'));
  public loading = false;



  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      about_me: [''],
      admin: [''],
      // public: ['']
    });
    this.userService.getbyUsername(this.data.editUser).subscribe(
      data => {
        this.editUser.first = data['first'];
        this.editUser.last = data['last'];
        this.editUser.password = data['password'];
        this.editUser.userName = data['userName'];
        this.editUser.about_me = data['about_me'];
        this.editUser.admin = data['admin'];
      }
    );
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.userService.update(this.form.value).subscribe(
        data => {
          if (data['success']) {
            this.loading = false;
            this.dialogRef.close();
          } else {
            this.loading = false;
            alert(data['error']);
          }
        }
      );
    }
    this.formSubmitAttempt = true;
  }

}
