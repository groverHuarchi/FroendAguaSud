import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { SocioService } from '../../shared/services/socio.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedidorService } from '../../shared/services/medidor.service';





@Component({
  selector: 'app-new-medidor',
  templateUrl: './new-medidor.component.html',
  styleUrls: ['./new-medidor.component.css']
})
export class NewMedidorComponent implements OnInit {

  fechaHoy= new Date;
  public medidorForm! : FormGroup;
  estadoFormulario : String = "";
  socios : Socio [] = [];
  selectedFile : any;
  nameImg : String = ""
  activo : String = "Activo"

  constructor( private fb : FormBuilder,
    private socioService : SocioService,
    private medidorService : MedidorService,
    private dialogRef : MatDialogRef<NewMedidorComponent>,
    ///recuperando datos del medidor componet
    @Inject(MAT_DIALOG_DATA) public data : any) {

      console.log("datos del medidor component",data)

      this.estadoFormulario = "Agregar";
      this.medidorForm = this.fb.group({
        serie : ['', [Validators.required, serieUnicaValidator(this.data.serie)]],
        direccion : ['', Validators.required],
        estado : [this.activo],
        lecturaInicial:['',Validators.required],
        croquis : [, ],
        fechaRegistro:[this.fechaHoy],
        socio : ['', Validators.required],}
      )
     
      


    }
    
  ngOnInit(): void {
    this.getSocios();

  }
 
  

  guardarDatosMedidor(){
    /// llenar los datos que estan en el formulario html
    let data = {
      serie : this.medidorForm.get('serie')?.value,
      direccion : this.medidorForm.get('direccion')?.value,
      estado : this.medidorForm.get('estado')?.value,
      lecturaInicial : this.medidorForm.get('lecturaInicial')?.value,
      croquis : this.selectedFile,
      fechaRegistro: this.medidorForm.get('fechaRegistro')?.value,
      socio : this.medidorForm.get('socio')?.value
    }

    const cargarMedidor = new FormData();
    cargarMedidor.append('serie', data.serie);
    cargarMedidor.append('direcccion', data.direccion);
    cargarMedidor.append('estado', data.estado);
    cargarMedidor.append('lecturaInicial', data.lecturaInicial);
    cargarMedidor.append('croquis', data.croquis, data.croquis.name);
    cargarMedidor.append('fechaRegistro', data.fechaRegistro);
    cargarMedidor.append('socioId', data.socio) /// 'socioId' es el atributo del backend

    console.log("esta es la fecha de medidor nuevo", this.fechaHoy)
    
      /// llamamos al servico medidor.service para guardar un mediddor
      console.log("ESTE MEDIDODR: ",cargarMedidor);
      console.log("esto es el data: ",data)
      this.medidorService.guardarMedidor(cargarMedidor)
            .subscribe( (data : any) => {
              this.dialogRef.close(1);
            },( error : any) => {
              this.dialogRef.close(2);
            })

  }

  cerrarPantallaGuardar(){
    this.dialogRef.close(3);
  }


  onfileChange(event : any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.nameImg = event.target.files[0].name;
  }

  getSocios(){
    this.socioService.getSocio()
          .subscribe( (data : any) =>{
            this.socios = data.socioResponse.socio;
          }, (error : any) =>{
            console.log("error al consultar socios");
          })
  }


}

export function serieUnicaValidator(existingSeries: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const serie = control.value;
    if (existingSeries.includes(serie)) {
      return { serieExistente: true };
    }
    return null;
  };
}

export interface Socio {
  idSocio:         number;
  ci:              string;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaRegistro:   Date;
}

export interface MedidorElement {
  idMedidor: number;
  serie:     string;
  direccion: string;
  estado:    boolean;
  lecturaInical : number;
  croquis : any,
  socio:     any;
}