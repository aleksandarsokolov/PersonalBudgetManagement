import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BillListComponent } from './bill-list.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'bills', component: BillListComponent }
    ])
  ],
  declarations: [
    BillListComponent
  ]
})
export class BillModule { }
