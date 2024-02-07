import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LecturacionComponent } from './components/lecturacion/lecturacion.component';
import { NewLecturacionComponent } from './components/new-lecturacion/new-lecturacion.component';
import { UpdateLecturacionComponent } from './components/update-lecturacion/update-lecturacion.component';




@NgModule({
  declarations: [
    LecturacionComponent,
    NewLecturacionComponent,
    UpdateLecturacionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LecturacionModule { }
