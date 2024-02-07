import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReciboService } from 'src/app/modules/shared/services/recibo.service';

@Component({
  selector: 'app-reporte-mes',
  templateUrl: './reporte-mes.component.html',
  styleUrls: ['./reporte-mes.component.css']
})
export class ReporteMesComponent implements OnInit {


  public montoPagados : number = 0;  
  public montoPorCobrar : number = 0;
  public totalMes : number = 0;

  public recibosTotales : number = 0;
  public reciboPagados : number = 0;
  public reciboCobrar : number = 0;

  constructor( @Inject(MAT_DIALOG_DATA) public data : String,

                public reciboService : ReciboService,

  ) {

          
   }

  ngOnInit(): void {

    console.log("este es el dato",this.data);
    this.getRecibosPTotalesMes();
    this.getRecibosPagadoMes();
    this.getRecibosPorCobrarMes();
  }


  getRecibosPTotalesMes(){
    console.log("entro al get")
    console.log(typeof this.data)
    console.log("valor de data",this.data)
    this.reciboService.getRecibostotalesMes(this.data)
          .subscribe((resp : any) => {
           
            console.log(resp)
            this.recibosTotales = resp.reciboResponse.recibo.length;

            if(resp.reciboResponse.recibo.length >= 0){
              const recibos = resp.reciboResponse.recibo;
              let recibosTotales = 0;
              for(let i=0 ; i < recibos.length; i++){

                recibosTotales= recibos[i].lecturacion.consumo * recibos[i].lecturacion.tarifa.precio;
                console.log("monto por recibo ",this.totalMes);
                this.totalMes = this.totalMes+recibosTotales;

              }

            }else{
              console.log("no existe recibos de totales")
            }
            
            // this.montoPagados = resp.reciboResponse.recibo[0].lecturacion.consumo * resp.reciboResponse.recibo[0].lecturacion.tarifa.precio
            console.log(this.totalMes);
            console.log( typeof this.totalMes, "tipo de dato");
          },(error : any) => {
            console.log(error)
          })
  }

  
  getRecibosPagadoMes(){
    console.log("entro al get")
    console.log(typeof this.data)
    console.log("valor de data",this.data)
    this.reciboService.getRecibosPagadosMes(this.data)
          .subscribe((resp : any) => {
           
            console.log(resp)
            this.reciboPagados = resp.reciboResponse.recibo.length;

            if(resp.reciboResponse.recibo.length >= 0){
              const recibos = resp.reciboResponse.recibo;
              let recibosPagados = 0;
              for(let i=0 ; i < recibos.length; i++){

                recibosPagados= recibos[i].lecturacion.consumo * recibos[i].lecturacion.tarifa.precio;
                console.log("monto por recibo ",this.montoPagados);
                this.montoPagados = this.montoPagados+recibosPagados;

              }

            }else{
              console.log("no existe recibos por cobrar")
            }
            
            // this.montoPagados = resp.reciboResponse.recibo[0].lecturacion.consumo * resp.reciboResponse.recibo[0].lecturacion.tarifa.precio
            console.log(this.montoPagados);
            console.log( typeof this.montoPagados, "tipo de dato");
          },(error : any) => {
            console.log(error)
          })
  }

  getRecibosPorCobrarMes(){
    console.log("entro al get")
    console.log(typeof this.data)
    console.log("valor de data",this.data)
    this.reciboService.getRecibosPorCobrarMes(this.data)
          .subscribe((resp : any) => {
           
            console.log(resp)
            this.reciboCobrar = resp.reciboResponse.recibo.length;

            if(resp.reciboResponse.recibo.length >= 0){
              const recibos = resp.reciboResponse.recibo;
              let recibosNoPagados = 0;
              for(let i=0 ; i < recibos.length; i++){

                recibosNoPagados= recibos[i].lecturacion.consumo * recibos[i].lecturacion.tarifa.precio;
                console.log("monto por recibo ",this.montoPagados);
                this.montoPorCobrar = this.montoPorCobrar+recibosNoPagados;

              }

            }
            // this.montoPagados = resp.reciboResponse.recibo[0].lecturacion.consumo * resp.reciboResponse.recibo[0].lecturacion.tarifa.precio
            console.log(this.montoPorCobrar);
            console.log( typeof this.montoPorCobrar, "tipo de dato");
          },(error : any) => {
            console.log(error)
          })
  }

}
