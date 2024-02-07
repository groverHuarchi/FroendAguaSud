import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CortesMedidorComponent } from './components/cortes-medidor/cortes-medidor.component';
import { ReporteMesComponent } from './components/reporte-mes/reporte-mes.component';
import { ReporteBetweenComponent } from './components/reporte-between/reporte-between.component';



@NgModule({
  declarations: [
    ReportesComponent,
    CortesMedidorComponent,
    ReporteMesComponent,
    ReporteBetweenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportesModule { }
