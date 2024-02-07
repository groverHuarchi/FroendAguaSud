import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SocioService } from 'src/app/modules/shared/services/socio.service';
import { NewSocioComponent } from '../new-socio/new-socio.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { VerSocioComponent } from '../ver-socio/ver-socio.component';
import { UpdateSocioComponent } from '../update-socio/update-socio.component';


@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css']
})
export class SocioComponent implements OnInit {

  public verificaSocio:any="";
  public ciExistentes : string []=[]

  constructor(private socioService: SocioService,
              public dialog : MatDialog,
              private snackbar:MatSnackBar
    ) { }

  ngOnInit(): void {

    this.getSocios();

  }

  displayedColumns : String[] = ['idSocio','ci','nombre','apellidos','fechaRegistro','actions']; //solo para la cabecera de la tabla

  dataSourse = new MatTableDataSource<SocioElement>(); //hace referencia a la interfas de socio

  ///paginador de material
  @ViewChild( MatPaginator)
  paginador! : MatPaginator;  //* ! se asiga el caracter cuando no se a inicializado


  //consumiendo el servicio de socios get socios
  getSocios(){
    
    this.socioService.getSocio()
        .subscribe((data : any) => {

          console.log("respuesta socios: ", data);
          this.processSociosResponse(data);// pasamos el data a este metodo

        },(error) => {
          console.log("error: ", error)
        })

  }

  //procesando la informacion de socios que biene del get socios
  processSociosResponse( resp : any){

    const dataSocio:SocioElement [] = [];
    this.ciExistentes=[];
    if(resp.metadata[0].code == "00"){

      let listSocio = resp.socioResponse.socio; // accediendo a los datos del json de socios. get socios
      
      this.verificaSocio="";

      listSocio.forEach((element:SocioElement) => { //recorer los datos listSocios
        
        
        this.ciExistentes.push(element.ci)
        dataSocio.push(element);//pasando la lista de socios a la varialble dataSocio
        
      });
      console.log("este ci: ", this.ciExistentes)
      // pasando  datasource al html los datos de getsocios para mluego mostrar en el html
      this.dataSourse = new MatTableDataSource<SocioElement>(dataSocio);
      this.dataSourse.paginator = this.paginador;

    }
    if(resp.metadata[0].code == "-1"){
      this.verificaSocio="No existe Socio con los datos a buscar";
      console.log("ëstas en el if");
      this.dataSourse = new MatTableDataSource<SocioElement>(dataSocio);
      this.dataSourse.paginator = this.paginador;
    }
  }

  //metodo para abrir un modal y guaradr nuevo socio
  abrirSocioDialogo(){
    const dialogRef = this.dialog.open( NewSocioComponent,{
      width: '450px',
      data: {ciSocios : this.ciExistentes}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Socio creado con Exito","Exitosa");
        this.getSocios();
      }else if(result == 2){
        this.openSnackBar("Error al crear socio","Error")
      }
    });

  }

  ////
  editar(idSocio:number, ci:string, nombre:string, primerApellido:String, segundoApellido:string ){
    const dialogRef = this.dialog.open( UpdateSocioComponent,{
      width: '450px',
      //pasando datos del html al componente new socio
      data : {idSocio : idSocio, ci:ci, nombre:nombre, primerApellido:primerApellido, segundoApellido:segundoApellido,ciSocios:this.ciExistentes}
      
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Socio Actualizado con Exito","Exitosa");
        this.getSocios();

      }else if(result == 2){
        this.openSnackBar("Error al actualizar socio","Error")
      }
    });
  }

  ///metodo de buscar socio por id
  buscarSocio(termino : string){

    if( termino.length === 0){
      return this.getSocios();
    }
    this.socioService.buscarSocioCiNomAmAP(termino)
          .subscribe(( resp : any ) =>{
            this.processSociosResponse(resp);
          },( error:any ) => {
            console.log(error);
          })
  }


  verSocio(socio : any){
    const dialogRef = this.dialog.open( VerSocioComponent,{
      width: '450px',
      //pasando datos del html al componente new socio
      data : {socio : socio}
      
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result ==1){
        this.openSnackBar("Socio Actualizado con Exito","Exitosa");
        this.getSocios();
      }else if(result == 2){
        this.openSnackBar("Error al actualizar socio","Error")
      }
    });


  }

  



  ///para mostrar en pantalla los mensajes de errro o exito
  openSnackBar(message : string, action : string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackbar.open(message , action , {
      duration: 5000
    })
  }

}


export interface SocioElement{
  idSocio:         number;
  fechaRegistro:   Date;
  ci:              string;
  nombre:          string;
  primerApellido: string;
  segundoApellido: string;
}