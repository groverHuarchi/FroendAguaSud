import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { NewAsistenciaComponent } from './components/new-asistencia/new-asistencia.component';
import { UpdateAsistenciaComponent } from './components/update-asistencia/update-asistencia.component';



@NgModule({
  declarations: [
    AsistenciaComponent,
    NewAsistenciaComponent,
    UpdateAsistenciaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AsistenciaModule { }
