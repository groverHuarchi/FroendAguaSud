import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CortesMedidorComponent } from '../cortes-medidor/cortes-medidor.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ReporteMesComponent } from '../reporte-mes/reporte-mes.component';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { FormBuilder } from '@angular/forms';
import { ReciboService } from 'src/app/modules/shared/services/recibo.service';
import { ReporteBetweenComponent } from '../reporte-between/reporte-between.component';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  
})
export class ReportesComponent implements OnInit {
  

  listaMes : String [] = ["ENERO2023","FEBRERO2023","MARZO2023","ABRIL2023","MAYO2023"];
  
  mesSelecionado! : String ;
 formularioFechas: any;

  constructor(  private fb: FormBuilder,
                public dialog : MatDialog,
                private snackbar:MatSnackBar,
                public reciboService : ReciboService
  ) { 


    this.formularioFechas = this.fb.group({
      rangoFechas: this.fb.group({
        start: "",
        end : ""
      }) // 'rangoFechas' es el nombre del control asociado al mat-date-range-input
    });
    
  }

  ngOnInit(): void {
    this.listaMes;
    this.formularioFechas
  }


  GenerarMedidoresEnCorte(){

    const dialogRef = this.dialog.open( CortesMedidorComponent, {
      width : "550px" 
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result == 1) {
        this.openSnackBar("Generacion de reporte con Exito","Exitosa");
      } else if (result == 2) {
                  this.openSnackBar("Error al generar reporte","Error");
      }{
        
      }
    })


  }

  GenerarReportePorMes(){
    console.log(this.mesSelecionado,"este es el mes del seltect");
    const dialogRef = this.dialog.open( ReporteMesComponent, {
      width : "550px",
      data : this.mesSelecionado
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result == 1) {
        this.openSnackBar("Generacion de reporte con Exito","Exitosa");
      } else if (result == 2) {
                  this.openSnackBar("Error al generar reporte","Error");
      }{
        
      }
    })


  }

  onSubmit() {
    const rangoFechas = this.formularioFechas.get('rangoFechas').value;
    console.log("que es este dato",rangoFechas)
      const fechaInicio = new Date (rangoFechas.start);
      // fechaInicio.setDate(fechaInicio.getDate() - 1);
      const fechaFin = new Date (rangoFechas.end);

      console.log("este fache es de typo ", typeof fechaFin )

    const dialogRef = this.dialog.open( ReporteBetweenComponent, {
      width : "550px",
      data : {fechaInicio : fechaInicio, fechaFin : fechaFin }
    });

    dialogRef.afterClosed().subscribe( (result : any) => {
      if (result == 1) {
        this.openSnackBar("Generacion de reporte con Exito","Exitosa")
      } else if(result == 2 ) {
                 this.openSnackBar("Error al generar reporte","Error");
      }
    } )


      // Aquí puedes realizar la lógica con las fechas (por ejemplo, llamar al servicio)
      // console.log('Fecha de inicio:', fechaInicio);
      // console.log(typeof fechaInicio);
      // console.log('Fecha de fin:', fechaFin);

      // this.reciboService.getRecibosBetween(fechaInicio,fechaFin)
      //         .subscribe(( resp : any) => {
      //           console.log(resp)
      //           console.log("entro al srvicon beetw")
      //         }, (error : any ) =>{
      //           console.log(error);
      //         } )
    
  }

  ///para mostrar en pantalla los mensajes de errro o exito
  openSnackBar(message : string, action : string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackbar.open(message , action , {
      duration: 5000
    })
  }

}
