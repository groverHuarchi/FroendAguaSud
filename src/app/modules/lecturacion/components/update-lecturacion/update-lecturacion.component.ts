import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { LecturacionService } from 'src/app/modules/shared/services/lecturacion.service';
import { ReciboService } from 'src/app/modules/shared/services/recibo.service';
import { TarifaService } from 'src/app/modules/shared/services/tarifa.service';

@Component({
  selector: 'app-update-lecturacion',
  templateUrl: './update-lecturacion.component.html',
  styleUrls: ['./update-lecturacion.component.css']
})
export class UpdateLecturacionComponent implements OnInit {

  public lecturacionForm : FormGroup;

  campoDesabilitado = true;

  ///datos para verificar estado recibo y mandar mesaje
  public mesajeDeRecibo : string ="";
  public habilitarBoton : boolean = true;

  /// datos para verificar tARIFA
  valiconsumo : number = 0;
  estaESlaTArifa : any ;

  ///colocar precio de lectura
  precioTotalLectura : any = 0;

  constructor(private fb : FormBuilder,
              private dialogRef : MatDialogRef<UpdateLecturacionComponent>,
              private reciboService : ReciboService,
              private tarifaService : TarifaService,
              private lecturacionService : LecturacionService,
              @Inject(MAT_DIALOG_DATA) public data : any
    ) {

      this.lecturacionForm = this.fb.group({
        mesLecturacion : ['',],
        lecturaAnterior : ['',],
        lecturaActual : ['',],
        medidor : ['',],
      })

      if(data != null){
        console.log("estos datos A actualizar",data)
        this.updateFormLecturacion(data);
      }

     }

  ngOnInit(): void {
    this.verificarEstadoReciboSegunIdLEcturacion(this.data.id);
  }

  actualizarLecturacion(){

    console.log("id lecturacion ",this.data.id, "tipo de dato", typeof this.data.id)

    this.valiconsumo = (parseInt(this.lecturacionForm.get('lecturaActual')?.value) - parseInt(this.data.lecturaAnterior))

    console.log("valor de valiconsumo ",typeof this.valiconsumo +" "+this.valiconsumo)

    this.asiganaTarifa(this.valiconsumo).subscribe((tarifaId: number | null) => {
      if (tarifaId !== null) {
        this.estaESlaTArifa = tarifaId;
        console.log("valor final de ", typeof this.estaESlaTArifa + " " + this.estaESlaTArifa);
  
        let data = {
          
          lecturaActual: this.lecturacionForm.get('lecturaActual')?.value,
          lecturaAnterior: this.data.lecturaAnterior,
          precioLecturacion: this.precioTotalLectura,
          medidorId: this.data.medidor.idMedidor,
          tarifaId: this.estaESlaTArifa
        };
  
        const cargarLectura = new FormData();
        
        cargarLectura.append('lecturaAnterior',data.lecturaAnterior );
        cargarLectura.append('lecturaActual', data.lecturaActual);
        cargarLectura.append('precioLecturacion', data.precioLecturacion);
        cargarLectura.append('medidorId', data.medidorId);
        cargarLectura.append('tarifaId', data.tarifaId);
  
        console.log("datos a enviar  ....", data);
        console.log("que datos cargaste", cargarLectura);
        this.lecturacionService.putActualizarLectura(cargarLectura,this.data.id)
          .subscribe((data: any) => {
            console.log("esta aqui saltando");
            this.dialogRef.close(1);
          }, (error: any) => {
            this.dialogRef.close(2);
            console.log("esta aqui y no guarda");
          });
      } else {
        console.log("No se encontró una tarifa válida para el consumo proporcionado.");
      }
    });

  }

  cerrarPantallaActualizar(){
    this.dialogRef.close(3);
  }

  updateFormLecturacion( data : any){
    this.lecturacionForm = this.fb.group({
        mesLecturacion : [data.mesLecturacion,],
        lecturaAnterior : [data.lecturaAnterior,],
        lecturaActual : [data.lecturaActual,[Validators.required, this.mayorLecturaAntValidator()]],
        medidor : [data.medidor.idMedidor,],
    })
  }

  mayorLecturaAntValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valorLecActual = control.value;
      
      if (valorLecActual != null) {
        const valorLecAnte = parseInt(this.data.lecturaAnterior); // Parsear a entero
        console.log("que valor obtienes del html", valorLecActual,"fgg");
        console.log("que valor estás comparando", this.data.lecturaAnterior);
        
        // Comparar valores
        if (valorLecActual <= valorLecAnte) {
          return { esMayor: true };
        }
      }
      return null;
    };
  }

  verificarEstadoReciboSegunIdLEcturacion(idLecturacion : number){

    this.reciboService.getEstadoREciboPorIdLecturacion(idLecturacion)
              .subscribe((resp : any ) => {
                console.log(resp)
                this.processEstadoReciboConIDLecturacion(resp);
              },(error : any) => {
                console.log(error)
              })

  }

  processEstadoReciboConIDLecturacion(resp : any){
    console.log("esta en el process")
    if(resp.metadata[0].code == "00"){
      console.log("estaprocesando resp")
     
      if(resp.reciboResponse.recibo[0].estadoPago == true){
        console.log("el estado es verdadero");
        this.habilitarBoton = true;
        this.mesajeDeRecibo = "no se puede actualizar Por que recibo ya fue pagado";
      }else if(resp.reciboResponse.recibo[0].estadoPago == false){
               console.log("el estado es falso",);
               this.habilitarBoton = false;
               this.mesajeDeRecibo = "";

             }

    }else if(resp.metadata[0].code == "-1"){
          console.log("no cuenta con recibo")
    }

    
  }

  asiganaTarifa(consumo : number) : Observable <number>{
    let maxConsumo : number = 0;
    let maxIdTarifa : number = 0;
    let maxPrecioTarifa : number = 0;

    console.log("entro a asignatariofa")
    return this.tarifaService.getTarifasActivas().pipe(
      map((resp: any) => {

        if (resp.metadata[0].code === "00") {
          let tarifasActivas = resp.tarifaResponse.tarifa;
          let i=0
          for (const tarifa of tarifasActivas) {
            console.log("enel for ",i++)
            console.log("tamaño de tarifa lenth ",tarifasActivas.length )
            if (consumo >= tarifa.minConsumo  && consumo <= tarifa.maxConsumo ) {
              console.log("precio del comsumo por presio consimo",consumo)
              console.log("preciode la tarifa asignada",tarifa.precio)
              console.log(typeof consumo,typeof tarifa.precio )
              this.precioTotalLectura=consumo*tarifa.precio;
              console.log(this.precioTotalLectura)
              
              
              return tarifa.idTarifa;
            }
            maxConsumo=tarifa.maxConsumo;
            maxIdTarifa=tarifa.idTarifa;
            maxPrecioTarifa=tarifa.precio;
            console.log("valor maximo de la ultima tarifa",maxConsumo)
            if(consumo >= maxConsumo ){
              this.precioTotalLectura = consumo * maxPrecioTarifa;
              console.log("precio total superando la tarifas", this.precioTotalLectura);
              console.log("tarifa asignada ",maxIdTarifa );
              
            }
          }
          return maxIdTarifa;
          
        }

        return null;
      })
    );
         
  }

}
