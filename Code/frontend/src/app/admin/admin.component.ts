import { Component, OnInit } from '@angular/core';
import { User } from './../auth/user';
import { UserService } from './../auth/user.service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns = ['select', 'id', 'first', 'last', 'userName', 'password', 'public', 'admin'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.refresh();
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
    }
    // console.log(this.selection.selected[0].userName);
  }

  deleteUser() {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    for (let i = 0; i < this.selection.selected.length; i++) {
      if (this.selection.selected[0].userName === currentUser.userName) {
        continue;
      } else {
        this.userService.delete(this.selection.selected[i].userName).subscribe(
          data => {
            // console.log(data);
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
