import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TarifaService } from 'src/app/modules/shared/services/tarifa.service';

@Component({
  selector: 'app-confir-delete',
  templateUrl: './confir-delete.component.html',
  styleUrls: ['./confir-delete.component.css']
})
export class ConfirDeleteComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<ConfirDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any,
               private tarifaService : TarifaService
          
    ) { }

  ngOnInit(): void {
  }


  eliminarTarifa(){

    if(this.data != null){
      this.data.estado = !this.data.estado;
      console.log("ver estado usuario " + this.data.estado)
      this.tarifaService.putCambiarEstado(this.data, this.data.idTarifa)
            .subscribe ((data : any) => {
              this.dialogRef.close(1);
            }, (error : any ) =>{
              this.dialogRef.close(2);
            })
    } else {
      this.dialogRef.close(2);
    }

  }

  onNoclick(){
    this.dialogRef.close(3);
  }
}
