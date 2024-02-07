import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewMedidorComponent } from 'src/app/modules/medidor/new-medidor/new-medidor.component';

import { AsistenciaService } from 'src/app/modules/shared/services/asistencia.service';

import { MedidorService } from 'src/app/modules/shared/services/medidor.service';
import { ReunionService } from 'src/app/modules/shared/services/reunion.service';

@Component({
  selector: 'app-new-asistencia',
  templateUrl: './new-asistencia.component.html',
  styleUrls: ['./new-asistencia.component.css']
})
export class NewAsistenciaComponent implements OnInit {

  public asistenciaForm! : FormBuilder;

  public botonDeshabilitado: boolean = false;

  mostrarBotonVolver: boolean = false;

  constructor(
              private fb : FormBuilder,
              private medidorService : MedidorService,
              private reunionService : ReunionService,
              private asistenciaService : AsistenciaService,
              private dialogRef : MatDialogRef<NewMedidorComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any

  ) {

    // this.asistenciaForm = this.fb.group({
    //   estado: ['',],
    //   idReunion:['',],
    //   idSocio:['',]
    // });

   }

  ngOnInit(): void {
    
    this.getReunionEnEspera();

    // if(this.mesAnhoReunion !== undefined ){
    //   // this.getMedidorActivos();
    //   console.log("esta en el if de ngomint")
    //   this.getMedidorActivos();
    // }
  }

  mensaje:string=""
  mesAnhoReunion : string ="";
  idReunionActual:any;



  displayedColumns : String[] = ['socio','actions']; //solo para la cabecera de la tabla  

  dataSourse = new MatTableDataSource<MedidorElement>();

  ///paginador de material
  @ViewChild( MatPaginator)
  paginador! : MatPaginator;  /// ! se asiga el caracter cuando no se a inicializado


  getMedidorActivos(){
     this.medidorService.listaMedidoresActivosCorteReunion()
          .subscribe((data : any) => {
              console.log("respuesta : ", data);
              this.processMedidorActvoResponse(data);
          },(error) => {
            console.log("error: ", error);
          })
  }

  processMedidorActvoResponse(resp : any){

    const dataMedidorAct : MedidorElement [] = [];

    if(resp.metadata[0].code == "00"){

      let listMedidor = resp.medidorResponse.medidor;

      listMedidor.forEach((element : MedidorElement) => {
          dataMedidorAct.push(element);
      });

      this.dataSourse = new MatTableDataSource<MedidorElement>(dataMedidorAct);
      this.dataSourse.paginator = this.paginador;

    }
  }



  getReunionEnEspera(){
    console.log("obteniendo reuniones")
    this.reunionService.getReunionEnEspera()
          .subscribe((data : any) => {
            
            // this.mesAnhoReunion = data.reunionResponse.reunion[0].mesAnhoReunion ;
            // this.idReunionActual = data.reunionResponse.reunion[0].idReunion;
            this.hayReunionEnEspera(data);
          }, (error) => {
            console.log("errro: ",error)
          })
  }

  hayReunionEnEspera(resp : any){

    

    if(resp.metadata[0].code == "00"){

      let listaReuniones = resp.reunionResponse.reunion;

      if(listaReuniones.length > 1){
        this.mensaje=`existe ${listaReuniones.length} reuniones con estado en espera`;
        this.mostrarBotonVolver = true
      }else{
        this.mesAnhoReunion=resp.reunionResponse.reunion[0].mesAnhoReunion
        if(this.mesAnhoReunion === this.data){
          this.idReunionActual=resp.reunionResponse.reunion[0].idReunion;
          this.getMedidorActivos()
        }else{
          console.log("La reunion agendada no corresponde al mes en curso",)
          this.mensaje="La reunion agendada no corresponde al mes en curso";
          this.mostrarBotonVolver = true;
        }
        
 
      }
      

    }else if(resp.metadata[0].code == "-1"){
      console.log('no hay reunion en espera')
      this.mensaje="no existe reuniones pendientes";
      this.mostrarBotonVolver = true
      
    }
  }
  


  visualizarDatosMedidorAct(data : any, indice : number  ){
        
    let idSocio = data.socio.idSocio;
   
    console.log(typeof this.idReunionActual);
   
    const cargarAsistencia = new FormData();

        cargarAsistencia.append("estado", "Presente");
        cargarAsistencia.append("socioId", idSocio);
        cargarAsistencia.append("reunionId", this.idReunionActual);   

    this.asistenciaService.postAsistencia(cargarAsistencia)
          .subscribe( (asisPresente : any ) => {
            console.log("que paso no entra qaqui",asisPresente);
            //this.dialogRef.close(1);

          }, (error) => {
            console.log(error);
          });
    
    //todo solo elimina la fila de la tabla y no haci los datos      
    const dato = this.dataSourse.data;
    dato.splice(indice,1);
    this.dataSourse.data = dato;
    //todo      
    //* bloque boton envia true
    if(dato.length <= 0){
      this.dialogRef.close(1);
    } 
  }

  visualizarDatosMedidorFal(data : any, indice : number  ){
        
    let idSocio = data.socio.idSocio;
   
    console.log(typeof this.idReunionActual);
   
    const cargarAsistencia = new FormData();

        cargarAsistencia.append("estado", "Falta");
        cargarAsistencia.append("socioId", idSocio);
        cargarAsistencia.append("reunionId", this.idReunionActual);   

    this.asistenciaService.postAsistencia(cargarAsistencia)
          .subscribe( (asisPresente : any ) => {
            console.log("que paso no entra qaqui",asisPresente);
            //this.dialogRef.close(1);

          }, (error) => {
            console.log(error);
          });
    
    //todo solo elimina la fila de la tabla y no haci los datos      
    const dato = this.dataSourse.data;
    dato.splice(indice,1);
    this.dataSourse.data = dato;
    //todo      
    //* bloque boton envia true
    if(dato.length <= 0){
      this.dialogRef.close(1);
    } 
  }

  volver(){
    this.dialogRef.close(3);
  }
  

}


export interface MedidorElement {
  idMedidor: number;
  serie:     string;
  direccion: string;
  estado:    boolean;
  socio:     any;
}

export interface SocioElement {
  ci:              string;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idSocio:         number;
  fechaRegistro:   Date;
}



