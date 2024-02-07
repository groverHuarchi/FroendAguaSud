import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import { ReciboService } from 'src/app/modules/shared/services/recibo.service';


// import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-update-recibo',
  templateUrl: './update-recibo.component.html',
  styleUrls: ['./update-recibo.component.css']
})
export class UpdateReciboComponent implements OnInit {

  public datos:string[]=["hola","hola1","hola3"];  
  constructor(
               private reciboService : ReciboService,
               private dialogRef : MatDialogRef<ReciboElement>,
               @Inject(MAT_DIALOG_DATA) public data : any
    

  ) { 

    console.log('datos del recibo a update recibo',data)
    console.log("este tipo de dato es : ",typeof data)
    console.log('datos del ID recibo',data.recibo.idRecibo)
  }

  ngOnInit(): void {
    
  }
  ///fecha para usar en el pdf
  fechaOriginal: string = this.data.recibo.fechaEmision;
  fecha: Date = new Date(this.fechaOriginal);
  
  //estado reunion

  pagarREcibo(){

    let fechaHoy  = new Date();
    console.log("fecha del recibo pagado",fechaHoy);
    console.log('datos del ID recibo',this.data.recibo.idRecibo)
    console.log("este tipo de dato es : ",typeof this.data.recibo.idRecibo)
      let data = {
        estadoPago : true,
        fechaPago : fechaHoy
      }
      this.reciboService.putReciboEstadoPagado(data, this.data.recibo.idRecibo)
            .subscribe( (data : any ) => {
              this.dialogRef.close(1);
            }, (error : any ) => {
              this.dialogRef.close(2)
            })

  }





  generatePDF1(){
    let doc = new jsPDF({orientation: "portrait", // Puedes cambiar a "landscape" si deseas orientación horizontal
    format: "letter"});
    
    // solo para imagen
        const img = new Image();
        // Ruta relativa a la imagen en la carpeta "assets"
        img.src = 'assets/SoloLogo.png';
        // Esperar a que la imagen se cargue
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          // Dibujar la imagen en el canvas
          ctx!.drawImage(img, 0, 0);
          // Obtener la imagen como una cadena base64
          const imageData = canvas.toDataURL('image/png');
          doc.addImage(imageData, 'PNG', 5, 5, 20, 20);
    // fin de cargar la imagen
    
    // nombre del sistema y cooperativa
    doc.setFont("arial", "bold");
    doc.setFontSize(20);
    doc.text("AGUASUD", 30, 15);
    // fin del nombre y cooperativa

    // nombre del sistema y cooperativa
    doc.setFont("arial", "bold");
    doc.setFontSize(10);
    doc.setTextColor('#bbbbbb');
    doc.text("Cooperativa RanchoSud", 29, 20);
    // fin del nombre y cooperativa

    //numero de recibo
    doc.setFont("arial", "bold");
    doc.setFontSize(17);
    doc.setTextColor('#FF0000');
    doc.text(`Recibo N.- ${this.data.recibo.idRecibo}`, 160, 15);
    // fin del recibo

    // nombre del titulo
    doc.setFont("arial", "bold");
    doc.setFontSize(25);
    doc.setTextColor('black');
    doc.text("RECIBO", 90, 40);
    // fin del titulo

    //datos de socio
        // titulo del mes
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Mes Consumo : `, 20, 60);
        // mes recibo
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.mesLecturacion} `, 50, 60);
        // titulo de Socio
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Socio : `, 20, 65);
        // nombre Socio
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.medidor.socio.nombre+" "+this.data.recibo.lecturacion.medidor.socio.apellidoPaterno+" "+this.data.recibo.lecturacion.medidor.socio.apellidoMaterno} `, 35, 65);
        // titulo de  Medidor
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Cod. Medidor : `, 150, 63);
        // Codigo Medidor
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.medidor.idMedidor} `, 180, 63);
        // titulo del direcccion
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Direccion : `, 20, 70);
        // dato direcccion
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.medidor.direccion} `, 42, 70);
    // fin datos socio

    // Datos de consumo
        // titulo de Comsumo Actual
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Lectura Anterior : `, 20, 75);
        // dato cons. actual
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.lecturaAnterior} `, 55, 75);
        // titulo de Comsumo actual
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Lectura Actual : `, 90, 75);
        // dato cons. actual
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.lecturaActual} `, 122, 75);
        // titulo de Comsumo 
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Consumo : `, 150, 75);
        // dato consumo
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.consumo} `, 172, 75);
        // titulo fecha emision
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Fecha de emision : `, 20, 80);
        // datofecha emision
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.fecha.getFullYear()}/${this.fecha.getMonth()+1}/${this.fecha.getDate()} `, 55, 80);
        // titulo Tarifa
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Tarifa : `, 20, 85);
        // dato de tarifa
        doc.setFont("times",'normal');
        doc.setFontSize(10);
        doc.text(`${this.data.recibo.lecturacion.tarifa.nombre} `, 35, 85);
    // Fin de datos consumo

    /// tutulo detalle de Consumo
        doc.setFont("arial", "bold");
        doc.setFontSize(14);
        doc.text("DETALLE", 94, 100);
    /// fin de titulo detalle

    /// linea separadora color gris
        doc.setDrawColor(155, 155, 155); 
        doc.setLineWidth(1);
        doc.line(20, 105, 190, 105); 
    /// finde linea


        // titulo de Cargo fijo
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Cargo Fijo `, 50, 115);
        /// importe en bs
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`Importe en Bs. `, 130, 115);
        // primera  tarifas
        doc.setFont("times",'normal');
        doc.setFontSize(12);
        doc.text('0m3 a 10m3', 55, 120);
        // precio
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`2 Bs. `, 100, 120);
        //todoqui va el precio posision en x es del 140 

        ///
        // segunda  tarifas
        doc.setFont("times",'normal');
        doc.setFontSize(12);
        doc.text('11m3 a 20m3', 55, 125);
        // precio
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`2.5 Bs. `, 100, 125);
        //todo aqui va el precio posision en x es del 140 

        ///
        // tercera  tarifas
        doc.setFont("times",'normal');
        doc.setFontSize(12);
        doc.text('21m3 a 30m3', 55, 130);
        // precio
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`4.5 Bs. `, 100, 130);
        //todoaqui va el precio posision en x es del 140 

        ///
        // cuarta  tarifa
        doc.setFont("times",'normal');
        doc.setFontSize(12);
        doc.text('31m3 en adelante', 55, 135);
        // precio
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`8 Bs. `, 100, 135);
        //todoaqui va el precio posision en x es del 140 

        ///
        // falta reunion
        doc.setFont("times",'normal');
        doc.setFontSize(12);
        doc.text('Multa por reunion', 55, 142);
        // estado
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`3 estados `, 100, 142);//! implemenetar el estado de reunion  PRESENTE FALTA RETRASO
        ///todoaqui va el precio  posision en x es del 140 

        //
        /// linea separadora color gris
        doc.setDrawColor(155, 155, 155); 
        doc.setLineWidth(1);
        doc.line(115, 145, 170, 145); 
        /// finde linea
        
        // TITULO TOTAL
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(`TOTAL `, 115, 150);
        // TOTAL A COBRAR
        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.text(`25 Bs.`, 140, 150); //! implementar la suma del consumo con el de la reunion

        /// linea separadora color gris
        doc.setDrawColor(155, 155, 155); 
        doc.setLineWidth(1);
        doc.line(20, 160, 190, 160); 
        /// finde linea

    
        ///respaldo en fisico para la cooperativa
          ///imagen
          doc.addImage(imageData, 'PNG', 5, 190, 20, 20);
           // nombre del sistema y cooperativa
          doc.setFont("arial", "bold");
          doc.setFontSize(20);
          doc.text("AGUASUD", 30, 200);
          // fin del nombre y cooperativa

          // nombre del sistema y cooperativa
          doc.setFont("arial", "bold");
          doc.setFontSize(10);
          doc.setTextColor('#bbbbbb');
          doc.text("Cooperativa RanchoSud", 29, 205);
          // fin del nombre y cooperativa

          //numero de recibo
          doc.setFont("arial", "bold");
          doc.setFontSize(17);
          doc.setTextColor('#FF0000');
          doc.text(`Recibo N.- ${this.data.recibo.idRecibo}`, 160, 207);
          // fin del recibo

          // nombre del titulo
          doc.setFont("arial", "bold");
          doc.setFontSize(25);
          doc.setTextColor('black');
          doc.text("RECIBO", 90, 220);
          // fin del titulo

          //datos de socio
              // titulo del mes
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Mes Consumo : `, 20, 230);
              // mes recibo
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.mesLecturacion} `, 50, 230);
              // titulo de Socio
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Socio : `, 20, 235);
              // nombre Socio
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.medidor.socio.nombre+" "+this.data.recibo.lecturacion.medidor.socio.apellidoPaterno+" "+this.data.recibo.lecturacion.medidor.socio.apellidoMaterno} `, 35, 235);
              // titulo de  Medidor
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Cod. Medidor : `, 150, 233);
              // Codigo Medidor
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.medidor.idMedidor} `, 180, 233);
              // titulo del direcccion
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Direccion : `, 20, 240);
              // dato direcccion
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.medidor.direccion} `, 42, 240);
          // fin datos socio
                // Datos de consumo
              // titulo de Comsumo Actual
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Lectura Anterior : `, 20, 245);
              // dato cons. actual
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.lecturaAnterior} `, 55, 245);
              // titulo de Comsumo actual
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Lectura Actual : `, 90, 245);
              // dato cons. actual
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.lecturaActual} `, 122, 245);
              // titulo de Comsumo 
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Consumo : `, 150, 245);
              // dato consumo
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.consumo} `, 172, 245);
              // titulo fecha emision
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Fecha de emision : `, 20, 250);
              // datofecha emision
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.fecha.getFullYear()}/${this.fecha.getMonth()+1}/${this.fecha.getDate()} `, 55, 250);
              // titulo Tarifa
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Tarifa : `, 20, 255);
              // dato de tarifa
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`${this.data.recibo.lecturacion.tarifa.nombre} `, 35, 255);
              // titulo fecha pagado recibo
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Fecha de Pago : `, 90, 255);
              // dato de tarifa
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`15/10/2023 `, 120, 255);//! aqui va la fecha y la hora en que se imprime la factura
              // titulo monto pagado
              doc.setFont("times", "bold");
              doc.setFontSize(12);
              doc.text(`Total Cancelado : `, 150, 255);
              // dato de tarifa
              doc.setFont("times",'normal');
              doc.setFontSize(10);
              doc.text(`150 BS `, 185, 255);//! aqui va el total pagado incluye la multa reunion
          // Fin de datos consumo
        ///fin del respaldo

    doc.save(`Recibo ${this.data.recibo.idRecibo}.pdf`);

    //  doc.output('dataurlnewwindow');
  
    }
  }

}


export interface ReciboElement {
  idRecibo:     number;
  fechaEmision: Date;
  fechaPago:    Date;
  estadoPago:   boolean;
  lecturacion:  any;
}
