import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';
import { NewUsuarioComponent } from '../new-usuario/new-usuario.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirDeleteComponent } from '../confir-delete/confir-delete.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor( private usuarioService : UsuarioService,
               public dialog : MatDialog,
               private snackBar : MatSnackBar 
    ) { }

  ngOnInit(): void {

    this.getUsuarioActivos();
  }

  //campos que viene del backend
  displayedColumns : string [] = ['idUsuario', 'ci', 'nombre', 'apellidoPaterno', 'apellidoMaterno','estado','acciones'];
  dataSource = new MatTableDataSource<UsuarioElement>();

   ///paginador de material
   @ViewChild( MatPaginator)
   paginador! : MatPaginator;  /// ! se asiga el caracter cuando no se a inicializado

  //metodo para consumir el servicio de usuariosevice
  getUsuario(){

    this.usuarioService.getUsuario()
          .subscribe( (data : any) => {
            console.log("respuesta usuarios: ",data);
            this.procesandoUsuarioResponse(data);
          }, (error : any) => {
            console.log("error: ",error);
          })
  }

  //metodo para consumir el servicio de usuariosevice getusuariosActivos
  getUsuarioActivos(){

    this.usuarioService.getUsuarioActivos()
          .subscribe( (data : any) => {
            console.log("respuesta usuarios: ",data);
            this.procesandoUsuarioResponse(data);
          }, (error : any) => {
            console.log("error: ",error);
          })
  }

  ///metodo para procesar la informacion que json 
  procesandoUsuarioResponse( resp : any ){

    const dataUsuario : UsuarioElement[] = [];

    if( resp.metadata[0].code == "00"){

      let listaUsuario = resp.usuarioResponse.usuario;

      listaUsuario.forEach((element : UsuarioElement) => {
        dataUsuario.push(element);
      });

      this.dataSource = new MatTableDataSource<UsuarioElement>(dataUsuario);
      
      ///lamado la variable del paginador para actualizar el regirto de paginas
      this.dataSource.paginator = this.paginador;
    }
  }

  ////abrir el componente new usuario
  openUsuarioDialog(){

    const dialogRef = this.dialog.open(NewUsuarioComponent, {
      width : '450px'
    });

    dialogRef.afterClosed().subscribe( (result : any) => {
      console.log("cerrar el dialog");
      if( result == 1 ){
          this.openSnackBar("Usuario Agregado","Exitosa");
          this.getUsuarioActivos();
      }else if ( result == 2 ){
        this.openSnackBar("Se produjo un error al guardar","Error");
      }
    });

  }

  openSnackBar( message : string , action : string ) : MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(message , action, {
      duration : 5000,
      
    }) 
  }


  edit(idUsuario : number, nombre : string, apellidoPaterno : string, apellidoMaterno : string, ci : string, estado : boolean ){

    const dialogRef = this.dialog.open(NewUsuarioComponent, {
      width: '450px',
      data : {idUsuario:idUsuario, nombre:nombre, apellidoPaterno:apellidoPaterno, apellidoMaterno:apellidoMaterno, ci:ci, estado:estado}
    });

    dialogRef.afterClosed().subscribe( (result : any) => {
      console.log("cerrar el dialog");
      if( result == 1 ){
          this.openSnackBar("Usuario Actualizado","Exitosa");
          this.getUsuarioActivos();
      }else if ( result == 2 ){
        this.openSnackBar("Se produjo un error al actualizar usuario","Error");
      }
    });

  }

  eliminar(idUsuario : number, nombre : string, apellidoPaterno : string, apellidoMaterno : string, ci : string, estado : boolean ){
    
    const dialogRef = this.dialog.open(ConfirDeleteComponent, {
      width: '450px',
      data : {idUsuario:idUsuario, nombre:nombre, apellidoPaterno:apellidoPaterno, apellidoMaterno:apellidoMaterno, ci:ci, estado:estado}
    });

    dialogRef.afterClosed().subscribe( (result : any) => {
      console.log("cerrar el dialog");
      if( result == 1 ){
          this.openSnackBar("Usuario Eliminado","Exitosa");
          this.getUsuarioActivos();
      }else if ( result == 2 ){
        this.openSnackBar("Se produjo un error al eliminar usuario","Error");
      }
    });
  }


  buscar( termino : string ){

    if( termino.length === 0 ){
      return this.getUsuarioActivos();
    }

    this.usuarioService.getCaracterBuscar(termino)
          .subscribe((resp : any ) => {
            this.procesandoUsuarioResponse(resp);
          })
  }

}

export interface UsuarioElement{
    ci:              string;
    nombre:          string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    idUsuario:       number;
    estado:          boolean;
}
