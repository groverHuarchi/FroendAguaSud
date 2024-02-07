import { Component, Inject, OnInit } from '@angular/core';
import { MedidorService } from '../../shared/services/medidor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-medidor',
  templateUrl: './delete-medidor.component.html',
  styleUrls: ['./delete-medidor.component.css']
})
export class DeleteMedidorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private medidorService : MedidorService,
              public dialogRef : MatDialogRef<DeleteMedidorComponent>
  ) { }

  ngOnInit(): void {
  }


  siEliminar(){


    if(this.data != null){
      let data = {
        estado : "baja"
      }
      

    const cargarMedidor = new FormData();
    
    cargarMedidor.append('estado', data.estado);

      this.medidorService.eliminarMedidor(cargarMedidor, this.data.medidor.idMedidor)
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
