import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedidorService } from 'src/app/modules/shared/services/medidor.service';

@Component({
  selector: 'app-ver-socio',
  templateUrl: './ver-socio.component.html',
  styleUrls: ['./ver-socio.component.css']
})
export class VerSocioComponent implements OnInit {

  public medidoresSocio : MedidorElement[]=[]

  constructor(private dialogRef: MatDialogRef<VerSocioComponent>,
              private medidoresService : MedidorService,
              @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {

    console.log("estos datos LLega",this.data)

    console.log(this.data.socio.ci);

    if(this.data != null){
      this.verMedidores(this.data.socio.ci)
    }
  }


  verMedidores(ci : string){

    this.medidoresService.listarMedidoresSocio(ci)
            .subscribe( (resp : any) => {
              console.log(resp);
              this.procesarMedidores(resp)
            },(error : any) => {
              console.log(error)
            })
  }


  procesarMedidores(result : any){

    const dataMedidor:MedidorElement [] = [];

    if(result.metadata[0].code == "00"){

      let listMedidores = result.medidorResponse.medidor; // accediendo a los datos del json de socios. get socios
      
     

      listMedidores.forEach((element:MedidorElement) => { //recorer los datos listSocios
        dataMedidor.push(element);
        
        
      });
      
    }
    this.medidoresSocio = dataMedidor;
  }

  volver(): void {
    // Cierra el modal al llamar a close en MatDialogRef
    this.dialogRef.close();
  }
}

export interface MedidorElement {
  idMedidor: number;
  serie:     string;
  direccion: string;
  estado:    boolean;
  lecturaInical : number;
  croquis : any,
  socio:     any;
}

export interface SocioElement {
  idSocio:         number;
  ci:              string;
  nombre:          string;
  primerApellido: string;
  segundoApellido: string;
  fechaRegistro:   Date;
}