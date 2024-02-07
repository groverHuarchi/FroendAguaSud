import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReciboService } from 'src/app/modules/shared/services/recibo.service';

@Component({
  selector: 'app-reporte-between',
  templateUrl: './reporte-between.component.html',
  styleUrls: ['./reporte-between.component.css']
})
export class ReporteBetweenComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              public reciboService : ReciboService,
  ) { }


  public montoPagadosBetween : number = 0;


  ngOnInit(): void {

    this.getRecibosBetween()

  }

  displayedColumns : String[] = ['idRecibo','medidor','socio'];
  dataSourse = new MatTableDataSource<ReciboElement>();

  ///paginador de material
  @ViewChild( MatPaginator)
  paginador! : MatPaginator;  /// ! se asiga el caracter cuando no se a inicializado

  getRecibosBetween(){
    const fechaini = new Date(this.data.fechaInicio);
    const fechafin = new Date(this.data.fechaFin);
    fechaini.setDate(fechaini.getDate() - 1);
    fechafin.setDate(fechafin.getDate() + 1);
    console.log("fecha mas un dia",fechafin)
     this.reciboService.getRecibosBetween(this.data.fechaInicio, fechafin)
              .subscribe(( resp : any) => {
                console.log(resp)
                console.log("entro al srvicon beetw");
                this.procesoReciboResponse(resp);
              }, (error : any ) =>{
                console.log(error);
              } )

  }

  procesoReciboResponse(resp : any){
    const datoRecibo : ReciboElement[] = [];
    let sumandoRecibo : number = 0;

    if( resp.metadata[0].code == "00"){
      
      let listaCRecibo = resp.reciboResponse.recibo;

      listaCRecibo.forEach((element : ReciboElement) =>{
        
        sumandoRecibo =  element.lecturacion.consumo * element.lecturacion.tarifa.precio;
        console.log("monto por recibo ",sumandoRecibo);
        this.montoPagadosBetween = this.montoPagadosBetween+sumandoRecibo;
        datoRecibo.push(element);
      });
      /// seteamos el datasource
      this.dataSourse = new MatTableDataSource<ReciboElement>(datoRecibo);
      this.dataSourse.paginator = this.paginador;
    }
    console.log("total monto de recibos pagados",this.montoPagadosBetween)

  }

}



export interface ReciboElement {
  idRecibo:     number;
  fechaEmision: Date;
  fechaPago:    Date;
  estadoPago:   boolean;
  lecturacion:  LecturacionElement;
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