import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToIconComponent } from './convert-to-icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule    
  ],
  declarations: [
    ConvertToIconComponent
  ],
  exports: [
    ConvertToIconComponent
  ]
})
export class SharedModule { }
