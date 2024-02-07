import { Component, OnInit , Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';

@Component({
  selector: 'app-confir-delete',
  templateUrl: './confir-delete.component.html',
  styleUrls: ['./confir-delete.component.css']
})
export class ConfirDeleteComponent implements OnInit {
  
  //crear un objeto de formulario


  constructor( public dialogRef : MatDialogRef<ConfirDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any,
              private usuarioService : UsuarioService
    ) { 

      
    }

  ngOnInit(): void {

  }

  siEliminar(){

    if(this.data != null){
      this.data.estado =!this.data.estado;
      console.log("ver estado usuario " + this.data.estado)
      this.usuarioService.eliminarUsuario(this.data, this.data.idUsuario)
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
