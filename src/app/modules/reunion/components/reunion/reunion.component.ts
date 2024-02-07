import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReunionService } from 'src/app/modules/shared/services/reunion.service';
import { NewReunionComponent } from '../new-reunion/new-reunion.component';
import { UpdateReunionComponent } from '../update-reunion/update-reunion.component';
import { VerReunionComponent } from '../ver-reunion/ver-reunion.component';



@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {

  public mensaje : String = ""; 
  public Allreuniones : string []= [];

  constructor( private serviceReunion : ReunionService,
               public dialog : MatDialog,
               private snackbar : MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getReuniones();
    this.listarAllReuniones();
  }

  displayedColumns : String[] = ['idReunion','fechaReunion','descripcion','estado','actions']; //solo para la cabecera de la tabla

  dataSourse = new MatTableDataSource<ReunionElement>(); //hace referencia a la interfas de socio 

    ///paginador de material
    @ViewChild( MatPaginator)
    paginador! : MatPaginator;  /// ! se asiga el caracter cuando no se a inicializado

    getReuniones(){
      this.serviceReunion.getReuniones()
            .subscribe((resp : any) => {
              console.log(resp);
              this.procesandoJsonReunion(resp);
            }, (error) =>{
              console.log(error);
            })
    }

    procesandoJsonReunion(resp : any){
      const datoReunion : ReunionElement [] = [];
      if(resp.metadata[0].code == "00"){

        let listaReuniones = resp.reunionResponse.reunion;

        listaReuniones.forEach((element : ReunionElement) =>{
          
          datoReunion.push(element);

        });

        this.dataSourse = new MatTableDataSource<ReunionElement>(datoReunion);
        this.dataSourse.paginator = this.paginador;

        this.mensaje = "";
      }
    }

    openMedidordialogo(){

      console.log("All mese ",this.Allreuniones)
      const dialogRef = this.dialog.open(NewReunionComponent,{
        width : '450px',
        data : this.Allreuniones

      });

      dialogRef.afterClosed().subscribe((result : any) => {
        if( result == 1 ){
          this.openSnackBar("Reunion guardada con exito", "Exito");
          this.getReuniones();
          this.listarAllReuniones();
        }else if(result == 2){
                this.openSnackBar("Error al guardar Reunion", "Error");
                this.listarAllReuniones();
        }
      })
    }
    openSnackBar(message : string , action : string ) : MatSnackBarRef<SimpleSnackBar>{
      return this.snackbar.open(message , action , {
        duration : 5000
      } )
    }

    verReunion(reunion:any){
      const dialogRef = this.dialog.open( VerReunionComponent, {
        width : '450px',
        data : {reunion : reunion }
      });

      dialogRef.afterClosed().subscribe( (result : any) => {
        if(result == 1){
          this.openSnackBar("reunion Actualizada con exito","Exitosa");
          this.getReuniones()
        }else if(result == 2){
                this.openSnackBar("Error al actualizar reunion","Error")
        }
      } );

    }

    actualizar(idReunion:number, mesAnhoReunion:String, estado:boolean, descripcion:string){
      const dialogRef = this.dialog.open( UpdateReunionComponent, {
        width : '450px',
        data : {idReunion:idReunion, mesAnhoReunion:mesAnhoReunion, estado:estado, descripcion:descripcion }
      });

      dialogRef.afterClosed().subscribe( (result : any) => {
        if(result == 1){
          this.openSnackBar("reunion Actualizada con exito","Exitosa");
          this.getReuniones()
        }else if(result == 2){
                this.openSnackBar("Error al actualizar reunion","Error")
        }
      } );

    }

    buscarReunionCaracter(caracter : String){

      if(caracter.length === 0) {
        return this.getReuniones();
      }
      console.log("bucando",caracter)
      this.serviceReunion.getReunionCaracter(caracter)
            .subscribe( (resp : any ) => {
              this.procesandoJsonReunion(resp);
            }, (error : any ) => {
              console.log(error);
              this.mensaje = "no existe reuniones con esos caracteres"
              const datoReunion : ReunionElement [] = [];
              this.dataSourse = new MatTableDataSource<ReunionElement>(datoReunion);
               this.dataSourse.paginator = this.paginador;
            })
    }

    listarAllReuniones(){

      this.serviceReunion.getReuniones()
            .subscribe( (resp : any ) => {
              this.processAllReuniones(resp);
            }, ( error : any ) =>{
              console.log(error);
            } )

    }
    processAllReuniones( resp: any ){
      const dataReunion : string[] = [];

      if(resp.metadata[0].code == "00"){
        let listaReunion = resp.reunionResponse.reunion;

        listaReunion.forEach((element : ReunionElement) => {
          dataReunion.push(element.mesAnhoReunion);
        });
        this.Allreuniones = dataReunion;
        console.log(this.Allreuniones);
      }
    }

}

export interface ReunionElement {
  idReunion:      number;
  mesAnhoReunion: string;
  descripcion:    string;
  estado:         boolean;
}
