import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css']
})
export class NewUsuarioComponent implements OnInit {

  //crear un objeto de formulario
  public usuarioForm : FormGroup;
  //cambiar ente actualizar y agregar
  estadoFormulario : string = "Crear";

  //constructor
  constructor(
        private fb             : FormBuilder, //importar formbuilder y todos sus metodos
        private usuarioService : UsuarioService, // iyectando todos los metodos de usuario service
        private dialogRef      : MatDialogRef<NewUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data : any //recibiemdo datos del componente padre(usuario Componet)

  ) { 

    // inicializando que campos tendra el formulario
    this.usuarioForm = this.fb.group({
      ci              : ['', Validators.required],
      nombre          : ['', Validators.required],
      apellidoPaterno : ['', Validators.required],
      apellidoMaterno : ['', Validators.required],
      estado          : ['', ],
    });

    if( data != null ){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }

  }

  ngOnInit(): void {
  }

  onGuardar(){
    // obteniendo los valores del formulario html y lo asignamos a un objeto let data
    let data = {
      ci                 : this.usuarioForm.get('ci')?.value,
      nombre             : this.usuarioForm.get('nombre')?.value,
      apellidoPaterno    : this.usuarioForm.get('apellidoPaterno')?.value,
      apellidoMaterno    : this.usuarioForm.get('apellidoMaterno')?.value,
      estado             : true
    }

    if(this.data != null){
      //actualizar usario
      this.usuarioService.putUsuario(data, this.data.idUsuario)
            .subscribe ((data : any) => {
              this.dialogRef.close(1);
            }, (error : any ) =>{
              this.dialogRef.close(2);
            })


    }else {
      //guardar usuarios
      this.usuarioService.postUsuario(data)
          .subscribe( (data : any )=> {
            console.log(data);
            this.dialogRef.close(1);
          }, (error : any) => {
            this.dialogRef.close(2);
          })
    }

    

  }

  onCancelar(){
    this.dialogRef.close(3);
  }

  // recibe el data para actualizar el formulario con los datos recueperados del padre
  updateForm( data : any){
    this.usuarioForm = this.fb.group({
      ci              : [data.ci, Validators.required],
      nombre          : [data.nombre, Validators.required],
      apellidoPaterno : [data.apellidoPaterno, Validators.required],
      apellidoMaterno : [data.apellidoMaterno, Validators.required],
      estado          : [data.estado, ],
    })
  }

}
