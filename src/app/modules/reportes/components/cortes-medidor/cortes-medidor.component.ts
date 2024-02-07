import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReciboService } from 'src/app/modules/shared/services/recibo.service';

@Component({
  selector: 'app-cortes-medidor',
  templateUrl: './cortes-medidor.component.html',
  styleUrls: ['./cortes-medidor.component.css']
})
export class CortesMedidorComponent implements OnInit {

  constructor(
                private reciboService: ReciboService,

  ) { }

  ngOnInit(): void {

    this.getMedidoresCorte();

  }

  displayedColumns : String [] = ["idMedidor","direccion","socio"];
  dataSourse = new MatTableDataSource<ReciboElement>();

    ///paginador de material
    @ViewChild( MatPaginator)
    paginador! : MatPaginator;  //* ! se asiga el caracter cuando no se a inicializado

  getMedidoresCorte(){
    this.reciboService.getMedidoresParaCorte()
            .subscribe((resp : any) => {
              this.proccesarRecibosResponse(resp);
            }, (error : any ) => {
              console.log(error);
            })
  }


  proccesarRecibosResponse(resp : any){

    let listaCorte : ReciboElement [] = [];

    if(resp.metadata[0].code == "00"){

      let listaReciboCorte = resp.reciboResponse.recibo;

      listaReciboCorte.forEach((element : ReciboElement) => {
        listaCorte.push(element);
      } );

      this.dataSourse = new MatTableDataSource<ReciboElement>(listaCorte);
      this.dataSourse.paginator = this.paginador;

    }
  }

}


export interface ReciboElement {
  idRecibo:     number;
  fechaEmision: Date;
  fechaPago:    null;
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