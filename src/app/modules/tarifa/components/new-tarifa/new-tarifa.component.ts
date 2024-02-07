import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TarifaService } from 'src/app/modules/shared/services/tarifa.service';

@Component({
  selector: 'app-new-tarifa',
  templateUrl: './new-tarifa.component.html',
  styleUrls: ['./new-tarifa.component.css']
})
export class NewTarifaComponent implements OnInit {

  public tarifaForm : FormGroup;

  estadoFormulario : String = "Agregar";
  prueba = ["1",4,"gh"];

  constructor( private fb : FormBuilder,
               private tarifaService : TarifaService,
               private dialogRef : MatDialogRef<NewTarifaComponent>,
               ///recuperando datos de tarifas componet
               @Inject(MAT_DIALOG_DATA) public data : any
    ) { 

      
      this.tarifaForm = this.fb.group({
        nombre : ['', Validators.required, serieUnicaNombre(this.data)],
        maxConsumo : ['',Validators.required],
        minConsumo : ['',Validators.required],
        precio : ['',Validators.required],
        estado : ['']
      })

     
    }

  ngOnInit(): void {

    console.log("datos",this.prueba,"typi de dato", typeof this.prueba);

    console.log("datos",this.data,"typi de dato", typeof this.data);

  }

  guaradarDatosTarifa(){

    let data = {
      nombre : this.tarifaForm.get('nombre')?.value,
      maxConsumo : this.tarifaForm.get('maxConsumo')?.value,
      minConsumo : this.tarifaForm.get('minConsumo')?.value,
      precio : this.tarifaForm.get('precio')?.value,
      estado : true
      
    }
  

      this.tarifaService.postTarifas(data)
          .subscribe((data: any) => {
             this.dialogRef.close(1);
      }, (error : any) => {
        this.dialogRef.close(2);
      })

   

    
  }

  cerrarPantallaGuardar(){
    this.dialogRef.close(3);
  }

 


  getTarifasActivas(){
    this.tarifaService.getTarifasActivas()
          .subscribe((resp : any) => {
            this.processGetTafifasActivas(resp)
          },(error : any) => {
            console.log(error);
          })
  }
  processGetTafifasActivas( resp: any ){
    const tarifasAct : TarifaElement[] = [];

    if(resp.metadata[0].code == "00"){
      let listaTarifaActiva = resp.tarifaResponse.tarifa;
      
      listaTarifaActiva.forEach( (element : TarifaElement) => {
        tarifasAct.push(element)
      });

    }

    console.log("datos process",tarifasAct)

  }



}

export function serieUnicaNombre(existeNombre : TarifaElement[]):ValidatorFn {
  return (control : AbstractControl ) : ValidationErrors  | null => {
    const nombre = control.value;
    console.log("datos que llegan validacion",existeNombre)
    console.log("esta en validacion",nombre)
    const existe = existeNombre.find(objeto => objeto.nombre === nombre);

    if (existe) {
      return { nombreExistente: true };
    }

    return null;
  };
}

export interface TarifaElement{
  idTarifa:    number;
  nombre:      string;
  maxConsumo:  number;
  minConsumo:  number;
  precio:      number;
  estado:      boolean;
}



