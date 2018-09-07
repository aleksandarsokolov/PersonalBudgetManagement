import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToIconComponent } from './convert-to-icon.component';
import { ShowTotalsComponent } from './show-totals.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule    
  ],
  declarations: [
    ConvertToIconComponent,
    ShowTotalsComponent
  ],
  exports: [
    ConvertToIconComponent,
    ShowTotalsComponent
  ]
})
export class SharedModule { }
