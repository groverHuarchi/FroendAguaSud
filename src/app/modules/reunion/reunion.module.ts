import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReunionComponent } from './components/reunion/reunion.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewReunionComponent } from './components/new-reunion/new-reunion.component';
import { estadoReunionPipe } from './pipes/estado-reunion.pipe';
import { UpdateReunionComponent } from './components/update-reunion/update-reunion.component';
import { TextCortoPipe } from './pipes/text-corto.pipe';
import { VerReunionComponent } from './components/ver-reunion/ver-reunion.component';




@NgModule({
  declarations: [
    ReunionComponent,
    NewReunionComponent,

    //pipes
    estadoReunionPipe,
     UpdateReunionComponent,
     TextCortoPipe,
     VerReunionComponent
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReunionModule { }
