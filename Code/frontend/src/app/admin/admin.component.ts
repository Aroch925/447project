import { Component, OnInit } from '@angular/core';
import { User } from './../auth/user';
import { UserService } from './../auth/user.service';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { AdminUserComponent } from './admin-user/admin-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns = ['select', 'id', 'first', 'last', 'userName', 'password', 'avatar', 'admin'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  adminUserDialogRef: MatDialogRef<AdminUserComponent>;
  public loading = false;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  openEditUserDialog(userName) {
    this.adminUserDialogRef = this.dialog.open(AdminUserComponent, {
      data: {
        editUser: userName
      }
    });
    this.adminUserDialogRef.afterClosed().subscribe(() => {
      this.refresh();
      this.masterToggle();
      this.masterToggle();
    });
  }
  refresh() {
    this.userService.getAll().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<User>(data);
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  editUser() {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    if (this.selection.selected.length > 1) {
      alert('You can only edit one user at a time');
    } else if (this.selection.selected[0].userName === currentUser.userName) {
      alert('Cannot Edit Current User from Admin Page');
    } else {
      this.openEditUserDialog(this.selection.selected[0].userName);
    }
  }

  deleteUser() {
    this.loading = true;
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    for (let i = 0; i < this.selection.selected.length; i++) {
      if (this.selection.selected[0].userName === currentUser.userName) {
        continue;
      } else {
        this.userService.delete(this.selection.selected[i].userName).subscribe(
          data => {
            if (data['success']) {
              this.refresh();
              this.masterToggle();
              this.masterToggle();
              this.loading = false;
            } else {
              this.loading = false;
              alert(data['error']);
            }
          }
        );
      }
    }
    // this.refresh();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
