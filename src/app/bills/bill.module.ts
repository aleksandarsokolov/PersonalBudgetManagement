import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BillListComponent } from './bill-list.component';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    DataModule,
    RouterModule.forChild([
      { path: 'bills', component: BillListComponent }
    ]),
    SharedModule
  ],
  declarations: [
    BillListComponent
  ]
})
export class BillModule { }
