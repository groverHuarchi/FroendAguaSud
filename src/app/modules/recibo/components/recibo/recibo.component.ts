
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReciboService } from 'src/app/modules/shared/services/recibo.service';
import { UpdateReciboComponent } from '../update-recibo/update-recibo.component';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  public mensaje : String = "";


  constructor( private reciboService : ReciboService,
               private dialog : MatDialog,
               private snackbar : MatSnackBar

    ) { }

  ngOnInit(): void {

    this.getRecibosConDeuda();
  }

  displayedColumns : String[] = ['idMedidor','mesConsumo','socio','monto','actions']; //solo para la cabecera de la tabla

  dataSource = new MatTableDataSource<ReciboElement>();

  @ViewChild( MatPaginator )
  paginator! : MatPaginator; // ! se asiga el caracter cuando no se a inicializado


getRecibosConDeuda(){

  this.reciboService.getRecibosConDeuda()
        .subscribe( (data : any ) => {
          console.log("respuesta: ",data);
          this.procesarRecibosConDeuda(data);
        },( error ) => {
          console.log("error de recibos ", error);

        });
}

procesarRecibosConDeuda( resp : any ){
  const datoRecibo : ReciboElement[] = [];
  if(resp.metadata[0].code == "00"){
    
    let listaRecibos = resp.reciboResponse.recibo;
    

    listaRecibos.forEach((element : ReciboElement) => {
      
      datoRecibo.push(element);
      //console.log("que hace tu ",element);
    });
    /// * Seteamos el dataSouce
    this.dataSource = new MatTableDataSource<ReciboElement>(datoRecibo);
    this.dataSource.paginator = this.paginator;

  } 
}

getBuscarReciboDuedaPorMedidor(medidorID :any){

  if(medidorID.length === 0 ){
    console.log("caracter tamaNho", medidorID.length )
    return this.getRecibosConDeuda();
    
  }
  this.reciboService.getRecibosPorMedidorConDeuda(medidorID)
        .subscribe((data : any) => {
          console.log(data);
          this.procesarRecibosConDeuda(data);
          },
        //   (error) => {
        //    console.log("errror en recibos",error);
        // }
        )

}

openSnackBar(message : string, action : string) : MatSnackBarRef<SimpleSnackBar>{
  return this.snackbar.open(message , action , {
    duration: 5000
  })
}

visualizarDatosRecibo( recibo : any ){

  const dialogRef = this.dialog.open( UpdateReciboComponent , {
    width : '750px',
    data : { recibo : recibo }
  });

  dialogRef.afterClosed().subscribe((result : any ) => {
    if(result == 1){
      this.openSnackBar("recibo pagado exitosamente","Exitosa")
      this.getRecibosConDeuda();
    }else if(result == 2 ){
      this.openSnackBar("error al pagar recibo","Error")
    }
  })

}




  

}

export interface ReciboElement {
  idRecibo:     number;
  fechaEmision: Date;
  fechaPago:    Date;
  estadoPago:   boolean;
  lecturacion:  any;
  estadoReunion : number;
}

export interface LecturacionElement {
    idLecturacion:   number;
    mesLecturacion:  string;
    lecturaAnterior: number;
    lecturaActual:   number;
    precioLecturacion :number;
    consumo:         number;
    medidor:         any;
    tarifa:          any;
}

export interface MedidorElement {
    idMedidor:      number;
    serie:          string;
    direccion:      string;
    estado:         boolean;
    lecturaInicial: number;
    socio:          any;
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