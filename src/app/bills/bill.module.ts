import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BillListComponent } from './bill-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'bills', component: BillListComponent }
    ])
  ],
  declarations: [
    BillListComponent
  ]
})
export class BillModule { }
