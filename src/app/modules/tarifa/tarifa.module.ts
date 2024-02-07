import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TarifaComponent } from './components/tarifa/tarifa.component';
import { NewTarifaComponent } from './components/new-tarifa/new-tarifa.component';
import { ConfirDeleteComponent } from './components/confir-delete/confir-delete.component';
import { UpdateTarifaComponent } from './components/update-tarifa/update-tarifa.component';



@NgModule({
  declarations: [
    TarifaComponent,
    NewTarifaComponent,
    ConfirDeleteComponent,
    UpdateTarifaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TarifaModule { }
