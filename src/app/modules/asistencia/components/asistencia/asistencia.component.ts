import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AsistenciaService } from 'src/app/modules/shared/services/asistencia.service';
import { NewAsistenciaComponent } from '../new-asistencia/new-asistencia.component';
import { UpdateAsistenciaComponent } from '../update-asistencia/update-asistencia.component';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  public botonDeshabilitado: boolean = false;
  ///para mandar un aviso que no existe ci de socio
  public mensaje : string = ""; 
  ///variables para bloquear boton
  public fechaAnho : string = "";
  public nombresMeses : string[] = ["ENERO", "FEBRERO", "MARZO", "ABRIL","MAYO", "JUNIO", "JULIO", "AGOSTO","SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

  constructor( private asistenciaService : AsistenciaService,
               private dialog : MatDialog,
               private snackbar:MatSnackBar
               
    ) { }

  ngOnInit(): void {
    this.ListarAsistenciaMesEnCurso()
    this.bloquearBotonAsistencia();
  }

  //solo para la cabecera de la tabla
  displayedColumns : String[] = ['idAsistencia','estado','reunion','socio','actions'];
  //hace referencia ala interfas de asistencia
  dataSourse = new MatTableDataSource<AsistenciaElement>();

  @ViewChild( MatPaginator)
  paginador! : MatPaginator;


  //consumiendo el servicio de getAsistenca
  getAsistencia(){
    this.asistenciaService.getAsistecias()
          .subscribe(( data : any ) => {
            console.log(data);
            this.processAsistenciaResponse(data);
            
          },(error) => {
            console.log("este es el erro: ",error);
          })
  }

  

  //procesando los datos que vienen del servicio getAsistencia 
  processAsistenciaResponse( resp : any ){

    const dataAsistenca : AsistenciaElement [] = [];

    if(resp.metadata[0].code == "00"){
      let listaAsistencia = resp.asistenciaResponse.asistencia;

      listaAsistencia.forEach((element : AsistenciaElement) => {
        dataAsistenca.push(element);
      });
      //pasando  datasource al html los datos de getsocios para mluego mostrar en el html
      this.dataSourse = new MatTableDataSource<AsistenciaElement>(dataAsistenca);
      this.dataSourse.paginator = this.paginador;
      this.mensaje = "";
    }
  }

  abrirAsisteciaDialog(){

    const dialogRef = this.dialog.open( NewAsistenciaComponent, {
      width : '550px',
      data : this.fechaAnho,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if( result == 1 ){
        this.openSnackBar("Asistencias Guardadas con Exito","Exitosa");
        this.botonDeshabilitado = true;
        this.ListarAsistenciaMesEnCurso();
      }else if(result == 2){
            this.openSnackBar("Error al Guaradar Asistencia","Error")
      }
    });

  }

  AsisteciaDialogUpdate(asistencia : any){

    const dialogRef = this.dialog.open( UpdateAsistenciaComponent, {
      width : '550px',
      data : {asistencia : asistencia}
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if( result == 1 ){
        this.openSnackBar("Asistencia Actualizada con Exito","Exitosa");
        this.ListarAsistenciaMesEnCurso();
      }else if(result == 2){
            this.openSnackBar("Error al Actualizar Asistencia","Error")
      }
    });

  }
  ///para mostrar en pantalla los mensajes de errro o exito
openSnackBar(message : string, action : string) : MatSnackBarRef<SimpleSnackBar>{
  return this.snackbar.open(message , action , {
    duration: 5000
  })
}

bloquearBotonAsistencia(){

        const fechaActual = new Date();
        // Obtener el año y el mes
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Ten en cuenta que los meses van de 0 a 11 en JavaScript
        let cadenaAnho: string = año.toString();
      
        const nombreMes = this.nombresMeses[mes - 1];
        // Imprimir los resultados
        this.fechaAnho = nombreMes+cadenaAnho;
        console.log("cadena mes anho",this.fechaAnho );
        this.asistenciaService.getBuscarAsisMesAnho(this.fechaAnho)
              .subscribe(( resp :any ) => {
                            this.procesarAsistenciaMesAnho(resp)

              },( error : any) => {
                    
              })
}


procesarAsistenciaMesAnho(resp : any){

  if(resp.metadata[0].code == "00"){
      this.botonDeshabilitado=true

    }else if(resp.metadata[0].code == "-1"){
      this.botonDeshabilitado=false
  }

}

ListarAsistenciaMesEnCurso(){

  const fechaActual = new Date();
  // Obtener el año y el mes
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1; // Ten en cuenta que los meses van de 0 a 11 en JavaScript
  let cadenaAnho: string = año.toString();

  const nombreMes = this.nombresMeses[mes - 1];
  // Imprimir los resultados
  this.fechaAnho = nombreMes+cadenaAnho;
  console.log("cadena mes anho",this.fechaAnho );
  this.asistenciaService.getListarAsisMesEnCurso(this.fechaAnho)
        .subscribe(( resp :any ) => {
                      this.processAsistenciaResponse(resp);
                      
        },( error : any) => {
              
        })
}


buscarCiSocio(termino : String){
  this.fechaAnho;
  console.log("fecha y anho que se nevia al buscar por ci")
  if(termino.length === 0 ){
    this.mensaje = "";
    return this.ListarAsistenciaMesEnCurso();

  }

  this.asistenciaService.getBuscarAsisPorCiSocioMesAnho(termino,this.fechaAnho)
        .subscribe( ( resp : any ) => {
          this.processAsistenciaResponse(resp);
        }, (error : any ) => {
          console.log(error);
          this.mensaje = "No existe socio con el ci proporcionado "
          const dataAsistenca : AsistenciaElement [] = [];
          this.dataSourse = new MatTableDataSource<AsistenciaElement>(dataAsistenca);
          this.dataSourse.paginator = this.paginador;
        })
}


}

export interface AsistenciaElement{
  idAsistencia: number;
  estado:       string;
  reunion:      any;
  socio:        any;
}

export interface ReunionElement {
  idReunion:      number;
  mesAnhoReunion: string;
  descripcion:    string;
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


