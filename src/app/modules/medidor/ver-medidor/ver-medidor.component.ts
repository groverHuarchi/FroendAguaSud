import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { MedidorService } from '../../shared/services/medidor.service';

@Component({
  selector: 'app-ver-medidor',
  templateUrl: './ver-medidor.component.html',
  styleUrls: ['./ver-medidor.component.css']
})
export class VerMedidorComponent implements OnInit {

  croquisId : any
  public medidorVer:any
  constructor(
              public medidorService : MedidorService,
              private dialogRef: MatDialogRef<VerMedidorComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any,
              ) { }

  ngOnInit(): void {

    console.log(this.data);
    console.log(this.data.medidor.idMedidor)
    
    this.buscarMedidorPorIdConCroquis();
   
  }

  buscarMedidorPorIdConCroquis(){
    
    this.medidorService.buscarMedidorPorIdConCroquis(this.data.medidor.idMedidor)
        .subscribe((resul : any) => {
          console.log(resul);
          this.croquisId= 'data:image/jpeg;base64,'+resul.medidorResponse.medidor[0].croquis
          // console.log(this.croquisId);
        },(error : any) => {
          console.log(error);
        } )
  }
    
  volver(): void {
    // Cierra el modal al llamar a close en MatDialogRef
    this.dialogRef.close();
  }



}
