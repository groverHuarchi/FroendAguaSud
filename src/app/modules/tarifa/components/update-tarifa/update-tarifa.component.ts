import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-tarifa',
  templateUrl: './update-tarifa.component.html',
  styleUrls: ['./update-tarifa.component.css']
})
export class UpdateTarifaComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

//   public tarifaForm : FormGroup;

//   estadoFormulario : String = "Agregar";

//   constructor( private fb : FormBuilder,
//                private tarifaService : TarifaService,
//                private dialogRef : MatDialogRef<NewTarifaComponent>,
//                ///recuperando datos de tarifas componet
//                @Inject(MAT_DIALOG_DATA) public data : any
//     ) { 

      

//       this.tarifaForm = this.fb.group({
//         nombre : ['', Validators.required],
//         maxConsumo : ['',Validators.required],
//         minConsumo : ['',Validators.required],
//         precio : ['',Validators.required],
//         estado : ['']
//       })

//       if(data != null){
//         this.updateForTarifa(data);
//         this.estadoFormulario = "Actualizar";
//       }
//     }

//   ngOnInit(): void {

    

//   }

//   guaradarDatosTarifa(){

//     let data = {
//       nombre : this.tarifaForm.get('nombre')?.value,
//       maxConsumo : this.tarifaForm.get('maxConsumo')?.value,
//       minConsumo : this.tarifaForm.get('minConsumo')?.value,
//       precio : this.tarifaForm.get('precio')?.value,
//       estado : true
      
//     }
  

//     if(this.data != null){
     
//       // llamanos al servicio tarifa.service de actualizar tarifa
//       this.tarifaService.putTarifas(data, this.data.idTarifa)
//               .subscribe( (data : any) => {
//                 this.dialogRef.close(1);
//               }, (error : any) => {
//                 this.dialogRef.close(2);
//               })
//     } else {

//       this.tarifaService.postTarifas(data)
//           .subscribe((data: any) => {
//              this.dialogRef.close(1);
//       }, (error : any) => {
//         this.dialogRef.close(2);
//       })

//     }

    
//   }

//   cerrarPantallaGuardar(){
//     this.dialogRef.close(3);
//   }

//   updateForTarifa(data : any){

//     this.tarifaForm = this.fb.group({
//         nombre : [data.nombre, Validators.required],
//         maxConsumo : [data.maxConsumo,Validators.required],
//         minConsumo : [data.minConsumo,Validators.required],
//         precio : [data.precio,Validators.required],
//         estado : [data.estado]
        
//     })
    
//   }


//   getTarifasActivas(){
//     this.tarifaService.getTarifasActivas()
//           .subscribe((resp : any) => {
//             this.processGetTafifasActivas(resp)
//           },(error : any) => {
//             console.log(error);
//           })
//   }
//   processGetTafifasActivas( resp: any ){
//     const tarifasAct : TarifaElement[] = [];

//     if(resp.metadata[0].code == "00"){
//       let listaTarifaActiva = resp.tarifaResponse.tarifa;
      
//       listaTarifaActiva.forEach( (element : TarifaElement) => {
//         tarifasAct.push(element)
//       });

//     }

//     console.log("datos process",tarifasAct)

//   }

// }

// export interface TarifaElement{
//   idTarifa:    number;
//   nombre:      string;
//   maxConsumo:  number;
//   minConsumo:  number;
//   precio:      number;
//   estado:      boolean;
// }



}
