import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocioComponent } from './components/socio/socio.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSocioComponent } from './components/new-socio/new-socio.component';
import { VerSocioComponent } from './components/ver-socio/ver-socio.component';
import { UpdateSocioComponent } from './components/update-socio/update-socio.component';



@NgModule({
  declarations: [
    SocioComponent,
    NewSocioComponent,
    VerSocioComponent,
    UpdateSocioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SocioModule { }
