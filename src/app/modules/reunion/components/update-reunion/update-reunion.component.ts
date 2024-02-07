import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewReunionComponent } from '../new-reunion/new-reunion.component';
import { ReunionService } from 'src/app/modules/shared/services/reunion.service';

@Component({
  selector: 'app-update-reunion',
  templateUrl: './update-reunion.component.html',
  styleUrls: ['./update-reunion.component.css']
})
export class UpdateReunionComponent implements OnInit {

  estadoArray : Estado[] = [{value : "true", vista: "En espera"},{value : "false", vista: "Concluida"}];

  public ReunionForm : FormGroup;

  constructor(
              private fb : FormBuilder,
              private ReunionService : ReunionService,
              public dialog : MatDialog,
              private dialogRef : MatDialogRef<NewReunionComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data :any)
              {

      this.ReunionForm = this.fb.group( {
        
        descripcion : [data.descripcion ],
        estado : [data.estado ? "true":"false" ],
      })

   }

  ngOnInit(): void {

    console.log("datos recibidos", this.data)
  }

  onSave(){

    
    let data = {
      
      descripcion : this.ReunionForm.get('descripcion')?.value,
      estado : this.ReunionForm.get('estado')?.value,
    }

    console.log("nuevos darots actualzados ", data)

    this.ReunionService.putActualizarReunion(data , this.data.idReunion)
          .subscribe((data : any) => {
            console.log("actualizar",data);
            this.dialogRef.close(1);
          },( error : any ) =>{
            this.dialogRef.close(2);
          })

  }

  cerrarPantallaGuardar(){
    this.dialogRef.close(3);
  }

  

}


interface Estado {
  value: string;
  vista: string;
}

