import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocioService } from 'src/app/modules/shared/services/socio.service';

@Component({
  selector: 'app-update-socio',
  templateUrl: './update-socio.component.html',
  styleUrls: ['./update-socio.component.css']
})
export class UpdateSocioComponent implements OnInit {


  public socioUpdateForm : FormGroup;

  constructor( private fb : FormBuilder,
               private socioService : SocioService,
               private dialogRef : MatDialogRef<UpdateSocioComponent>,
               ///recuperando datos del socios componet
               @Inject(MAT_DIALOG_DATA) public data:any) {
       
      this.socioUpdateForm = this.fb.group({
          ci : [data.ci,Validators.required],
          nombre : [data.nombre,Validators.required],
          primerApellido : [data.primerApellido],
          segundoApellido : [data.segundoApellido],
      })          
    
      
    
   }

   

  ngOnInit(): void {

    console.log("estos son los datos de data",this.data)
  }

  

  guardarDatosSocio(){

    let nombreMayusculas = this.socioUpdateForm.get('nombre')?.value.toUpperCase();
    let nombreCapitalizado = nombreMayusculas.charAt(0).toUpperCase() + nombreMayusculas.slice(1).toLowerCase();

    // ser arma el objeto json para luego mandar al servicio guardar
    let data = {
      ci: this.socioUpdateForm.get('ci')?.value,
      nombre: nombreCapitalizado,
      primerApellido: this.socioUpdateForm.get('primerApellido')?.value,
      segundoApellido: this.socioUpdateForm.get('segundoApellido')?.value,
      
    }
    
      //actualizar registro de socio
      this.socioService.actualizar(data, this.data.idSocio)
            .subscribe( (data : any) => {
              this.dialogRef.close(1);
            },(error : any ) =>{
                this.dialogRef.close(2);
            })
    

    

  }

  

  cerrarPantallaGuardar(){
    this.dialogRef.close(3);
  }









}
