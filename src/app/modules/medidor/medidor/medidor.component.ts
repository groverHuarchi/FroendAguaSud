import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MedidorService } from '../../shared/services/medidor.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMedidorComponent } from '../new-medidor/new-medidor.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { VerMedidorComponent } from '../ver-medidor/ver-medidor.component';
import { UpdateMedidorComponent } from '../update-medidor/update-medidor.component';
import { DeleteMedidorComponent } from '../delete-medidor/delete-medidor.component';


@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.css']
})
export class MedidorComponent implements OnInit {

  
  public seriesexistentes : string []=[]
  public verificaMedidor="";
  constructor( private medidorService : MedidorService,
              public dialog : MatDialog,
              private snackbar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMedidor();
    this.obtenerTodasLasSeries()
  }

  displayedColumns : String[] = ['idMedidor','serie','direccion','lecturaInicial','socio','actions']; //solo para la cabecera de la tabla

  dataSourse = new MatTableDataSource<MedidorElement>(); //hace referencia a la interfas de socio 

  ///paginador de material
  @ViewChild( MatPaginator)
  paginador! : MatPaginator;  // ! se asiga el caracter cuando no se a inicializado

  getMedidor(){
    this.medidorService.listaMedidoresActivosCorteSinCroquis()
          .subscribe( (data : any ) => {
            console.log("respuesta de get medidores: ", data);
            this.procesoMedidorResponse(data);
          },(error) => {
            console.log("error en medidores", error);
          });
  }
  
  //procesando datos del servicio de la respuesta apirest
  procesoMedidorResponse(resp : any){
    const datoMedidor : MedidorElement[] = [];
    if( resp.metadata[0].code == "00"){
      
      let listaCMedidor = resp.medidorResponse.medidor;

      listaCMedidor.forEach((element : MedidorElement) =>{
        //element.socio = element.socio.nombre +" "+ element.socio.apellidoPaterno; // se asigana el nombre de socio a objeto socio para mostrar en el html
        datoMedidor.push(element);
      });
      
      
    }

    /// seteamos el datasource
    this.dataSourse = new MatTableDataSource<MedidorElement>(datoMedidor);
    this.dataSourse.paginator = this.paginador;

    if(resp.metadata[0].code == "-1"){
      this.verificaMedidor="No existe medidor con los datos a buscar";
      console.log("ëstas en el if");
      this.dataSourse = new MatTableDataSource<MedidorElement>(datoMedidor);
      this.dataSourse.paginator = this.paginador;
    }

  }

  obtenerTodasLasSeries(){
    console.log("entro a buscar las seies")
     this.medidorService.listaTodosMedidoresSerie()
          .subscribe((data : any) => {
            console.log("esta las series",data);
            this.guardarSeries(data);
          }, (error : any) => {
            console.log(error)
          });
  }


  guardarSeries(resp : any){
    const dataseries : string [] = [];

    if(resp.metadata[0].code == "00"){
      let listaDeSerie = resp.medidorResponse.medidor;

      listaDeSerie.forEach((element : MedidorElement ) => {
        dataseries.push(element.serie);
      });
    this.seriesexistentes=dataseries
    console.log("recibiendo el array",this.seriesexistentes)
    }

  }
  openMedidordialogo(){
    const dialogRef = this.dialog.open( NewMedidorComponent,{
      width: '450px',
      data: {serie : this.seriesexistentes}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Medidor Guardado con Exito","Exitosa");
        this.getMedidor();
      }else if(result == 2){
        this.openSnackBar("Error al Guaradar Medidor","Error")
      }
    });
  }

  ///para mostrar en pantalla los mensajes de errro o exito
  openSnackBar(message : string, action : string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackbar.open(message , action , {
      duration: 5000
    })
  }


  editar(idMedidor : number, serie : string,  direccion : string, estado : String, lecturaInicial : number,  socio : any ){
    const dialogRef = this.dialog.open( UpdateMedidorComponent,{
      width: '450px',
      data: {id : idMedidor, serie : serie, direccion : direccion, estado : estado, lecturaInicial : lecturaInicial, socio : socio} //atributo id es para enviar al newMedidor component
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Medidor Actualizado con Exito","Exitosa");
        this.getMedidor();
      }else if(result == 2){
        this.openSnackBar("Error al actualizar Medidor","Error")
      }
    });

  }

  verMedidor(medidor : any){
    const dialogRef = this.dialog.open( VerMedidorComponent,{
      width: '450px',
      data: {medidor : medidor} //atributo id es para enviar al newMedidor component
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Medidor Actualizado con Exito","Exitosa");
        this.getMedidor();
      }else if(result == 2){
        this.openSnackBar("Error al actualizar Medidor","Error")
      }
    });

  }

  eliminarMedidor(medidor : any){
    const dialogRef = this.dialog.open( DeleteMedidorComponent,{
      width: '450px',
      data: {medidor : medidor} //atributo id es para enviar al newMedidor component
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Medidor eliminado con Exito","Exitosa");
        this.getMedidor();
      }else if(result == 2){
        this.openSnackBar("Error al eliminar Medidor","Error")
      }
    });

  }
  

  buscar(serie : any){
    if(serie.length === 0 ){
      console.log("tamanho de serie", serie.length);
      return this.getMedidor();
      
    }
    this.medidorService.buscarPorSerieMedidor(serie)
          .subscribe((resp : any)  => {
            this.procesoMedidorResponse(resp);
          })
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
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaRegistro:   Date;
}