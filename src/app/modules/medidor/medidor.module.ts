import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedidorComponent } from './medidor/medidor.component';
import { NewMedidorComponent } from './new-medidor/new-medidor.component';
import { VerMedidorComponent } from './ver-medidor/ver-medidor.component';
import { UpdateMedidorComponent } from './update-medidor/update-medidor.component';
import { DeleteMedidorComponent } from './delete-medidor/delete-medidor.component';



@NgModule({
  declarations: [
    MedidorComponent,
    NewMedidorComponent,
    VerMedidorComponent,
    UpdateMedidorComponent,
    DeleteMedidorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MedidorModule { }
