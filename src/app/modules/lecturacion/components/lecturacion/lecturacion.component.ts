import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LecturacionService } from 'src/app/modules/shared/services/lecturacion.service';
import { NewLecturacionComponent } from '../new-lecturacion/new-lecturacion.component';
import { UpdateLecturacionComponent } from '../update-lecturacion/update-lecturacion.component';

@Component({
  selector: 'app-lecturacion',
  templateUrl: './lecturacion.component.html',
  styleUrls: ['./lecturacion.component.css']
})
export class LecturacionComponent implements OnInit {

  public fechaAnho : string = "";
  public nombresMeses : string[] = ["ENERO", "FEBRERO", "MARZO", "ABRIL","MAYO", "JUNIO", "JULIO", "AGOSTO","SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
 

  constructor(  private lecturacionService : LecturacionService,
                public dialog : MatDialog,
                private snackbar : MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getLecturas();
  }

  displayedColumns : String[] = ['idLecturacion','mesLecturacion','lecturaAnterior','lecturaActual','consumo','medidor','actions']; //solo para la cabecera de la tabla html

  dataSourse = new MatTableDataSource<LecturacionElement>(); //hace referencia a la interfas de socio 

  ///paginador de material
  @ViewChild( MatPaginator)
  paginador! : MatPaginator;  /// ! se asiga el caracter cuando no se a inicializado


  getLecturas(){
    this.lecturacionService.getLecturacion()
          .subscribe((data : any) => {
            console.log("respuesta de lecturaciones: ", data);
            this.prosesandoGetLecturasResponse(data);
          }, (error : any) => {
            console.log("error en lecturaciones: ",error)
          })
  }

  prosesandoGetLecturasResponse( resp : any){
    const dateLecturacion : LecturacionElement[] = [];
    if(resp.metadata[0].code == "00"){
      
      let listaLecturas = resp.lecturacionResponse.lecturacion;

      listaLecturas.forEach((element : LecturacionElement) => {
        //element.medidor = element.medidor.idMedidor;

        dateLecturacion.push(element);

      });
      /// setamos el dataSource
      this.dataSourse = new MatTableDataSource<LecturacionElement>(dateLecturacion);
      /// setamos el paginador
      this.dataSourse.paginator = this.paginador;
    }
  }

  openMedidordialogo(){
     // Obtener la fecha actual
     const fechaActual = new Date();
     // Obtener el año y el mes
     const año = fechaActual.getFullYear();
     const mes = fechaActual.getMonth() + 1; // Ten en cuenta que los meses van de 0 a 11 en JavaScript
     let cadenaAnho: string = año.toString();
     const nombreMes = this.nombresMeses[mes - 1];
     // Imprimir los resultados
     this.fechaAnho = nombreMes+cadenaAnho;

     
    const dialogRef = this.dialog.open( NewLecturacionComponent,{
      width: '750px',
      data : this.fechaAnho,
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Lectura Guardada con Exito","Exitosa");
        this.getLecturas();
      }else if(result == 2){
        this.openSnackBar("Error al Guaradar Lectura","Error")
      }
    });
  }

  ///para mostrar en pantalla los mensajes de errro o exito
  openSnackBar(message : string, action : string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackbar.open(message , action , {
      duration: 5000
    })
  }

  ///Actualizar Lecturacion
  editar(idLecturacion : number, mesLecturacion : string, lecturaAnterior : number, lecturaActual : number, medidor : any ){ 
    const dialogRef = this.dialog.open( UpdateLecturacionComponent,{
      width : '450',
      data : {id : idLecturacion, mesLecturacion : mesLecturacion, lecturaAnterior : lecturaAnterior, lecturaActual: lecturaActual, medidor : medidor }
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if(result == 1){
        this.openSnackBar("Lecturacion Actualizado con Exito","Exitosa");
        this.getLecturas();
      }else if(result == 2 ){
        this.openSnackBar("Error al actualizar Lecturacion","Error")
      }
    });

  }

}



export interface LecturacionElement {
    idLecturacion:   number;
    mesLecturacion:  string;
    lecturaAnterior: number;
    lecturaActual:   number;
    consumo:         number;
    medidor:         MedidorElement;
    tarifa:          TarifaElement;
}

export interface MedidorElement {
    idMedidor:      number;
    serie:          string;
    direccion:      string;
    estado:         boolean;
    lecturaInicial: number;
    socio:          SocioElement;
}

export interface SocioElement {
  ci:              string;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idSocio:         number;
  fechaRegistro:   Date;
}

export interface TarifaElement {
  idTarifa:   number;
  nombre:     string;
  minConsumo: number;
  maxConsumo: number;
  precio:     number;
  estado:     boolean;
}