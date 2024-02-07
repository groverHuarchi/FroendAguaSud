import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AsistenciaService } from 'src/app/modules/shared/services/asistencia.service';

@Component({
  selector: 'app-update-asistencia',
  templateUrl: './update-asistencia.component.html',
  styleUrls: ['./update-asistencia.component.css']
})
export class UpdateAsistenciaComponent implements OnInit {

  public estadoAsistencia : string [] = ["Presente","Retraso","Falta"];
  public asistenciaForm : FormGroup ; 
 
  constructor(
            private fb : FormBuilder,
            private asistenciaService : AsistenciaService,
            private dialogRef : MatDialogRef<UpdateAsistenciaComponent>,
            @Inject(MAT_DIALOG_DATA) public data : any
  ) { 

    this.asistenciaForm = this.fb.group({
      
      estado : ["", Validators.required ],
      

    })

    if(this.data != null){
      console.log("nombre del estado",this.data.asistencia.estado)
      this.updateformAsistencia(this.data);
      
    }
            
  }

  ngOnInit(): void {

    console.log(this.data)
  }


  actualizarEStado(){

    let data = {
      estado : this.asistenciaForm.get('estado')?.value
    }

    if(this.data != null){
      console.log("que envias al servicio",data,"  id asistencai ",this.data.idAsistencia)
      this.asistenciaService.actualizarEstado(data, this.data.asistencia.idAsistencia)
            .subscribe((data : any ) => {
              this.dialogRef.close(1);
            },(error : any ) => {
              this.dialogRef.close(3);
            })
    }

  }

  cerrarPantallaActualizar(){
    this.dialogRef.close(3);
  }




  updateformAsistencia(data : any){

    this.asistenciaForm = this.fb.group({
      
      estado : [data.asistencia.estado, Validators.required],
      // reunion:[data.reunion.idReunion,Validators.required],
      // socio : [data.socio.idSocio, Validators.required],

    })
  }


}



export interface AsistenciaElement {
  idAsistencia: number;
  estado:       String;
  reunion:      ReunionElement;
  socio:        SocioElement;
}



export interface ReunionElement {
  idReunion:      number;
  mesAnhoReunion: String;
  descripcion:    String;
  estado:         boolean;
}


export interface SocioElement {
  ci:              string;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idSocio:         number;
  fechaRegistro:   Date;
}


