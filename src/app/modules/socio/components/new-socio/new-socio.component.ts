import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocioService } from 'src/app/modules/shared/services/socio.service';


@Component({
  selector: 'app-new-socio',
  templateUrl: './new-socio.component.html',
  styleUrls: ['./new-socio.component.css']
})
export class NewSocioComponent implements OnInit {

  fechaHoy= new Date;
  public existeSocio:any;
  

 
 
 


  constructor( private fb : FormBuilder,
               private socioService : SocioService,
               private dialogRef : MatDialogRef<NewSocioComponent>,
               ///recuperando datos del socios componet
               @Inject(MAT_DIALOG_DATA) public data:any) {

                
      
    
   }

   
   public socioForm : FormGroup = this.fb.group( {
    ci : ['',[
      Validators.required,
      Validators.minLength(7),
      Validators.pattern(/^[0-9]+$/),
      ciUnicaValidator(this.data.ciSocios),
      ciLength(),
    ] 
    ],
     
    nombre : ['',Validators.required],
    primerApellido : ['',Validators.required],
    segundoApellido : [''],
    fechaRegistro:[this.fechaHoy]
  })
   

  ngOnInit(): void {

    
    console.log("ngonint",this.data.ciSocios)
    
    
  }

  

  guardarDatosSocio(){

    let nombreMayusculas = this.socioForm.get('nombre')?.value.toUpperCase();
    let nombreCapitalizado = nombreMayusculas.charAt(0).toUpperCase() + nombreMayusculas.slice(1).toLowerCase();

    // ser arma el objeto json para luego mandar al servicio guardar
    let data = {
      ci: this.socioForm.get('ci')?.value,
      nombre: nombreCapitalizado,
      primerApellido: this.socioForm.get('primerApellido')?.value,
      segundoApellido: this.socioForm.get('segundoApellido')?.value,
      fechaRegistro: this.socioForm.get('fechaRegistro')?.value,
    }
    console.log("datos fecha ",data)

    
      //crear  o guardar socio
      
      this.socioService.guardarSocios(data)
          .subscribe((data :any) => {
            console.log("estos datos"+data);
            this.dialogRef.close(1);
          },(error : any ) => {
              this.dialogRef.close(2);
          })

  }


  cerrarPantallaGuardar(){
    this.dialogRef.close(3);
  }



}

export function ciUnicaValidator(existingCi: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const ci = control.value;
    console.log("que datos",ci);
    console.log("que datos",existingCi);
    if (existingCi.includes(ci)) {
      return { ciExistente: true };
    }
    return null;
  };
}

export function ciLength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const ci = control.value;
    
    if (ci.length > 8) {
      return { ciLengthMin: true };
    }
    return null;
  };
}