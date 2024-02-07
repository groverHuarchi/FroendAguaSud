import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReunionService } from 'src/app/modules/shared/services/reunion.service';


@Component({
  selector: 'app-new-reunion',
  templateUrl: './new-reunion.component.html',
  styleUrls: ['./new-reunion.component.css']
})
export class NewReunionComponent implements OnInit {

  public ReunionForm : FormGroup;

  public mensajeExiteReunion : string="";
 
  snackbar: any;

  public fechaAnho : string = "";
  public nombresMeses : string[] = ["ENERO", "FEBRERO", "MARZO", "ABRIL","MAYO", "JUNIO", "JULIO", "AGOSTO","SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
 
  constructor(  private fb : FormBuilder,
                private ReunionService : ReunionService,
                public dialog : MatDialog,
                private dialogRef : MatDialogRef<NewReunionComponent>,
                @Inject(MAT_DIALOG_DATA) public data : any,
  ) { 
          this.ReunionForm = this.fb.group({
            mesAnhoReunion : ['',],
            descripcion : ['',Validators.required],
            estado : ['', ]
          })
  }

  ngOnInit(): void {

        // Obtener la fecha actual
        const fechaActual = new Date();

        // Obtener el año y el mes
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Ten en cuenta que los meses van de 0 a 11 en JavaScript
        let cadenaAnho: string = año.toString();
      
        const nombreMes = this.nombresMeses[mes - 1];
        // Imprimir los resultados
        this.fechaAnho = nombreMes+cadenaAnho;
        console.log(`Año: ${año}`);
        console.log(`Mes: ${mes}`);
        console.log("cadena mes anho",this.fechaAnho );
        
        console.log(this.data)

        if(this.data.includes(this.fechaAnho)){
            this.mensajeExiteReunion="Reunion ya existe"
        }

  }

  onSave(){

    ///armamos el objetos con los datos llenados del formulario del html
    let data = {
      mesAnhoReunion : this.fechaAnho,
      descripcion : this.ReunionForm.get('descripcion')?.value,
      estado : true
    }

    this.ReunionService.postGuardarReunion(data)
          .subscribe((data : any) => {
            this.dialogRef.close(1);
          },( error : any ) =>{
            this.dialogRef.close(2);
          })

  }

  cerrarPantallaGuardar(){
    this.dialogRef.close(3);
  }

}


