import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUsuarioComponent } from './components/new-usuario/new-usuario.component';
import { ConfirDeleteComponent } from './components/confir-delete/confir-delete.component';
import { EstadoUsuarioPipe } from './pipes/estado-usuario.pipe';



@NgModule({
  declarations: [
    UsuarioComponent,
    NewUsuarioComponent,
    ConfirDeleteComponent,
    EstadoUsuarioPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
