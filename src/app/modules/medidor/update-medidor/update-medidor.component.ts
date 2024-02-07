import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedidorService } from '../../shared/services/medidor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocioService } from '../../shared/services/socio.service';


@Component({
  selector: 'app-update-medidor',
  templateUrl: './update-medidor.component.html',
  styleUrls: ['./update-medidor.component.css']
})
export class UpdateMedidorComponent implements OnInit {

  public estadoMedidor : string [] = ["Activo","Corte"];
  socios : SocioElement [] = [];
  public medidorForm : FormGroup;
  estadoFormulario : String = "";
  selectedFile : any | null;
  nameImg : String | null = ""

  constructor(
    private fb : FormBuilder,
    private medidorService : MedidorService,
    private socioService:SocioService,
    private dialogRef : MatDialogRef<UpdateMedidorComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any

  ) { 

    this.estadoFormulario = "Actualizar";

    this.medidorForm = this.fb.group({
      
        serie : ['', Validators.required],
        direccion : ['', Validators.required],
        estado : ['',Validators.required],
        lecturaInicial:['', Validators.required],
        croquis : [''],
        socio : ['', Validators.required],
      

    })

    if(this.data != null){
      
      this.updateformMedidor(this.data);
      
    }
  }

  ngOnInit(): void {
    this.getSocios()
    console.log("datos del medidor compomen",this.data)
  }


  actualizarMedidor(){

    let data = {
      
      serie : this.medidorForm.get('serie')?.value,
      direccion : this.medidorForm.get('direccion')?.value,
      estado : this.medidorForm.get('estado')?.value,
      lecturaInicial : this.medidorForm.get('lecturaInicial')?.value,
      croquis : this.selectedFile,
      socio : this.medidorForm.get('socio')?.value
      
    }

    const cargarMedidor = new FormData();
    cargarMedidor.append('serie', data.serie);
    cargarMedidor.append('direcccion', data.direccion);
    cargarMedidor.append('estado', data.estado);
    cargarMedidor.append('lecturaInicial', data.lecturaInicial);
    cargarMedidor.append('socioId', data.socio) /// 'socioId' es el atributo del backend
    if (data.croquis) {
      cargarMedidor.append('croquis', data.croquis, data.croquis.name);
    }
     console.log("idmeddior que se envia a axtualizar", this.data.id)    
    this.medidorService.actualizarMedidor(cargarMedidor,this.data.id)
          .subscribe( (data : any) => {
            this.dialogRef.close(1);
          },( error: any ) => {
            this.dialogRef.close(2);
          })

  }


  updateformMedidor(data : any){

    this.medidorForm = this.fb.group({
      
      serie : [data.serie, ],
      direccion : [data.direccion, ],
      estado : [data.estado,],
      lecturaInicial:[data.lecturaInicial,[Validators.required, Validators.min(0)]],
      socio : [data.socio.idSocio, ],
      croquis : [''],

    })
  }

  getSocios(){
    this.socioService.getSocio()
          .subscribe( (data : any) =>{
            this.socios = data.socioResponse.socio;
          }, (error : any) =>{
            console.log("error al consultar socios");
          })
    
  }

  cerrarPantallaActualizar(){
    this.dialogRef.close(3);
  }

  onfileChange(event : any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.nameImg = event.target.files[0].name;

  }


}


export interface SocioElement {
  idSocio:         number;
  ci:              string;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaRegistro:   Date;
}