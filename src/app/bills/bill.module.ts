import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BillListComponent } from './bill-list.component';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatTableModule, MatSortModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DataModule,
    RouterModule.forChild([
      { path: 'bills', component: BillListComponent }
    ]),
    SharedModule, BrowserAnimationsModule,
    MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatTableModule, MatSortModule, MatCheckboxModule
  ],
  declarations: [
    BillListComponent
  ]
})
export class BillModule { }
