import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReciboComponent } from './components/recibo/recibo.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateReciboComponent } from './components/update-recibo/update-recibo.component';



@NgModule({
  declarations: [
    ReciboComponent,
    UpdateReciboComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReciboModule { }
