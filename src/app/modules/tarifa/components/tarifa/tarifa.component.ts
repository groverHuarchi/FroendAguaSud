import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { TarifaService } from 'src/app/modules/shared/services/tarifa.service';
import { NewTarifaComponent } from '../new-tarifa/new-tarifa.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirDeleteComponent } from '../confir-delete/confir-delete.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {

  public mensaje: string ="";
  public getTarifasAct : TarifaElement[]=[];

  constructor( private tarifaService : TarifaService,
               private dialog : MatDialog,
               private snackBar : MatSnackBar
    ) { }

   

  ngOnInit(): void {

    this.getTarifasTrue();
    
  }
  //campos que estan en el html
  displayedColumns : string [] = ['idTarifa', 'nombre', 'descripcion', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<TarifaElement>();

  ///paginador de material
  @ViewChild( MatPaginator)
  paginador! : MatPaginator;  /// ! se asiga el caracter cuando no se a inicializado




  getTarifasTrue(){
    this.tarifaService.getTarifasActivas()
          .subscribe( (data: any) => {
            console.log(data);
            this.procesandoTarifaResponse(data);
          },( error : any ) => {
            console.log(error);
          }) 
  }

  getTarifasfalse(){
    this.tarifaService.getTarifasInactivas()
          .subscribe( (data: any) => {
            console.log(data);
            this.procesandoTarifaResponse(data);
          },( error : any ) => {
            console.log(error);
          }) 
  }


  procesandoTarifaResponse( resp : any ){
    
    const dataTarifa : TarifaElement [] = [];
    if(resp.metadata[0].code == "00"){
      let listaTarifa = resp.tarifaResponse.tarifa;

      listaTarifa.forEach((element : TarifaElement) => {
        dataTarifa.push(element);
      });

      this.getTarifasAct=dataTarifa;//datos para validar nuevas tarifas      
      this.dataSource = new MatTableDataSource<TarifaElement>(dataTarifa);

      ///lamado la variable del paginador para actualizar el regirto de paginas
      this.dataSource.paginator = this.paginador;
      this.mensaje = "";
    }
  }

  openTarifaDialog(){

    const dialogRef = this.dialog.open(NewTarifaComponent,{
      width : "450px",
      data : this.getTarifasAct,
    });

    dialogRef.afterClosed().subscribe( ( result : any) => {
        if(result == 1){
          this.openSnackBar("Tarifa Agregada", "Exitosa");
          this.getTarifasTrue();
        }else if(result == 2){
          this.openSnackBar("Se Produjo un error al guardar","Error")
        }
    })


  }

  openSnackBar( message : string , action : string ) : MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(message , action, {
      duration : 5000,
      
    }) 
  }

  editar(idTarifa : number, nombre : string, maxConsumo : number, minConsumo : number, precio : number, estado : boolean){
    const dialogRef = this.dialog.open(NewTarifaComponent, {
      width : "450px",
      data : {idTarifa : idTarifa, nombre : nombre, maxConsumo : maxConsumo, minConsumo: minConsumo, precio : precio, estado : estado}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Tarifa Actualizada con Exito","Exitosa");
        this.getTarifasTrue();
      }else if(result == 2){
        this.openSnackBar("Error al actualizar Tarifa","Error")
      }
    });



  }

  eliminar(idTarifa : number, nombre : string, descripcion : string, precio : number, estado : boolean){
    const dialogRef = this.dialog.open(ConfirDeleteComponent, {
      width: '450px',
      data : {idTarifa : idTarifa, nombre : nombre, descripcion : descripcion, precio : precio, estado : estado}
    });
    dialogRef.afterClosed().subscribe( (result : any) => {
      console.log("cerrar el dialog");
      if( result == 1 ){
          this.openSnackBar("Tarifa dada de baja","Exitosa");
          this.getTarifasTrue();
      }else if ( result == 2 ){
        this.openSnackBar("Se produjo un error al dar de baja Tarifa","Error");
      }
    });

  }

  buscarTarifa(caracter : String){

    if(caracter.length === 0){
      this.mensaje = "";
      return this.getTarifasTrue();
    }

    this.tarifaService.getTarifaPorNombre(caracter)
          .subscribe((resp : any) => {
            this.procesandoTarifaResponse(resp);
          }, (error : any ) => {

            console.log("estas en el errro")
            
            console.log(error);
            this.mensaje = "no se encontro tarifas con ese nombre";
            const dataTarifa : TarifaElement [] = [];
            this.dataSource = new MatTableDataSource<TarifaElement>(dataTarifa);
            this.dataSource.paginator = this.paginador;
          })
  }

}

export interface TarifaElement{
    idTarifa:    number;
    nombre:      string;
    maxConsumo:  number;
    minConsumo:  number;
    precio:      number;
    estado:      boolean;
}
