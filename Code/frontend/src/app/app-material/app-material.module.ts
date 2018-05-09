import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatExpansionModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatExpansionModule
  ]
})
export class AppMaterialModule { }
