import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { AsistenciaService } from 'src/app/modules/shared/services/asistencia.service';


import { LecturacionService } from 'src/app/modules/shared/services/lecturacion.service';
import { MedidorService } from 'src/app/modules/shared/services/medidor.service';
import { TarifaService } from 'src/app/modules/shared/services/tarifa.service';


@Component({
  selector: 'app-new-lecturacion',
  templateUrl: './new-lecturacion.component.html',
  styleUrls: ['./new-lecturacion.component.css']
})
export class NewLecturacionComponent implements OnInit {

  public lecturaForm : FormGroup;
  //mensaje de verificacion de xistencia de medidor y avisar en el html
  mensajeMedidorExistente:string="";
  //idmedidor de lecturas
  public idMedidorParaLecturas : number = 0;
  //grover asignado la lectura inicail del medidor por su primera lectura
  public LecturaInicia:any;
  public mesajePrimeraLectura="";
  //PRECIO TOTAL DE LA LCTURA
  public precioTotalLectura : number = 0;

  //!mes en curso tiene lectura
  public yaMedidorTieneMesLectura: String = "";
  public validarElMes : boolean = true;
  public UltimoMEsLecturacion:string=""
 
  //datos a rellenar al formulario
  public lecturaAnt : any;
  public LecturaAct : any;
  public medidorBuscado : any;
  

  ///aSIGNAR TARIFA
  public estaESlaTArifa : any;
  public valiconsumo : any;

   /// buscar si exixte medidor
   public siHayMedidor:boolean = false  ;
   public lecturaInicialMedidor : any;
   public mensajeNoexisteMedidor : string = "";

   ///array de asistencia del este mes
   public asistenciaDelMes : AsistenciaElement [] = [];
   public idSocioParaAsistencia : any;
   public suMultaPorReunion : number = 0;
  
  constructor(
              private lecturacionService : LecturacionService,
              private tarifaService : TarifaService,
              private medidorService : MedidorService,
              private asisteciaService : AsistenciaService,
              private fb : FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data : any,
              private dialogRef : MatDialogRef<NewLecturacionComponent>

  ) { 

    this.lecturaForm = this.fb.group({
      mesLecturacion : [''],
      lecturaActual : ['',[Validators.required, this.fechaYLEctAnteValidator()]],
      lecturaAnterior :[''],
      precioLecturacion :[''],
      medidorId :['',],
      tarifaId : ['']
    })
    this.lecturaForm.get('mesLecturacion')?.setValue(this.data);
  }

  ngOnInit(): void {

    console.log("valor de la gecha en string",this.data)
    this.listarAsistenciasPorMes();
    console.log("el array de asistencuia",this.asistenciaDelMes);
  }

  displayedColumns : string [] = ['mesLecturacion', 'lecturaAnterior', 'lecturaActual','consumo'];
  dataSource = new MatTableDataSource<LecturacionElement>();

  buscarOpcion(caracter : any){
    if(caracter == 0){
      console.log("no tine caracarteres para hacer la consulta")
      this.yaMedidorTieneMesLectura="";
      this.mensajeNoexisteMedidor="";
      this.mesajePrimeraLectura="";
      this.suMultaPorReunion=0
      this.lecturaForm.get('lecturaActual')?.setValue(null);
      this.lecturaForm.get('lecturaActual')?.setErrors(null);
      this.resetearLecturasAnteriores();
      
    }else if(caracter > 0){
      	    const exiteMedidor = this.medidorService.buscarMedidorPorIdSinCroquis(caracter);
            const existeLectura = this.lecturacionService.getLecturasAnteriores(caracter);

            forkJoin([exiteMedidor, existeLectura]).subscribe(
              ([respMedidor, respLectura] ) => {
                console.log("respuesta de medidor", respMedidor);
                console.log(typeof respMedidor)
                console.log("respuesta de lecturacion", respLectura);
                console.log("este emedidor estamos consultando",caracter)
                
                this.procesarOpcionDos(respMedidor,respLectura);
                
              }, (error:any) => {
                  console.log(error);
              }
            );
    }
  }

  procesarOpcionDos(resp1 : any, resp2 : any){

    if(resp1.metadata[0].code == "00"){
      console.log("exixte el mediddor en la base de datos medidor")
      this.mensajeNoexisteMedidor="";
      
      if(resp2.metadata[0].code == "00"){
        console.log("este medidor tiene lecturas");
        this.medidorBuscado = resp1.medidorResponse.medidor[0].idMedidor;
         console.log("este es el id de socio",resp1.medidorResponse.medidor[0].socio.idSocio);
        this.processMultaDeAsistencia(resp1.medidorResponse.medidor[0].socio.idSocio);
        this.procesarTresLecAnt(resp2);
      }else{
        if(resp2.metadata[0].code == "-1"){
          console.log("este medidor no tiene lecturas anteriores asi que usaremos su primera lectura de ref MOSTRAR SU LECRTURA EN EL HTML");
          this.LecturaInicia=resp1.medidorResponse.medidor[0].lecturaInicial
          console.log("esta el la lectira inicail",this.LecturaInicia)
          console.log(typeof this.LecturaInicia);
          this.medidorBuscado = resp1.medidorResponse.medidor[0].idMedidor;
          console.log("este es el id medidor",this.medidorBuscado);
          console.log(typeof this.medidorBuscado);
          this.mesajePrimeraLectura = "primera Lectura de medidor"
          this.lecturaAnt= this.LecturaInicia;
          this.validarElMes=false;
          
          this.resetearLecturasAnteriores();
        }
      }
    }else{
      console.log("no esta reguistrado el medidor y mostrar un msj en el html")
      this.mensajeNoexisteMedidor="No existe codigo de medidor"
      this.yaMedidorTieneMesLectura="";
      this.mesajePrimeraLectura="";
      this.resetearLecturasAnteriores();
    }

  }


  procesarTresLecAnt( resp : any){
    const dataLectura : LecturacionElement[] = [];
    console.log("3 lecturas")

    if( resp.metadata[0].code == "00"){
      let listaAnterioresLecturas = resp.lecturacionResponse.lecturacion;
      
      listaAnterioresLecturas.forEach((element : LecturacionElement , i : number) => {
        console.log(listaAnterioresLecturas.length+" "+i);
 
        if(listaAnterioresLecturas.length-3 <= i){//listaAnterioresLecturas.length-3 <= i //i===listaAnterioresLecturas.length-1
          this.lecturaAnt = listaAnterioresLecturas[i].lecturaActual;
          console.log("esto es lectura anterior : ",listaAnterioresLecturas[i].lecturaActual);
          
          if(listaAnterioresLecturas[i].mesLecturacion === this.data){
            console.log("mes sistema",this.data,"mes de la ultima lectura",listaAnterioresLecturas[i].mesLecturacion);
            this.yaMedidorTieneMesLectura=`Medidor ya cuenta con la lectura para el mes de : ${this.data}`;
            this.validarElMes=true;
          }else{
            this.validarElMes=false;
          }

          console.log(this.validarElMes);
          dataLectura.push(element); 
        }

      })
      this.dataSource = new MatTableDataSource<LecturacionElement>(dataLectura);
      }
     
  }



  resetearLecturasAnteriores(){
    const dataLectura : LecturacionElement [] = [];
    this.dataSource = new MatTableDataSource<LecturacionElement>(dataLectura);
    
  }

  cerrarPantallaGuardar(){
    this.dialogRef.close(3);
  }


  guardarLecturacion(){

    this.valiconsumo = (parseInt(this.lecturaForm.get('lecturaActual')?.value) - parseInt(this.lecturaAnt))

    console.log("valor de valiconsumo ",typeof this.valiconsumo +" "+this.valiconsumo)

    this.asiganaTarifa(this.valiconsumo).subscribe((tarifaId: number | null) => {
      if (tarifaId !== null) {
        this.estaESlaTArifa = tarifaId;
        console.log("valor final de ", typeof this.estaESlaTArifa + " " + this.estaESlaTArifa);

        let data = {
          mesLecturacion: this.data,
          lecturaActual: this.lecturaForm.get('lecturaActual')?.value,
          lecturaAnterior: String(this.lecturaAnt),
          precioLecturacion: String(this.precioTotalLectura+this.suMultaPorReunion),
          medidorId: this.medidorBuscado,
          tarifaId: String(this.estaESlaTArifa)
        };
  
        const cargarLectura = new FormData();
        cargarLectura.append('mesLecturacion', data.mesLecturacion);
        cargarLectura.append('lecturaActual', data.lecturaActual);
        cargarLectura.append('lecturaAnterior', data.lecturaAnterior);
        cargarLectura.append('precioLecturacion', data.precioLecturacion);
        cargarLectura.append('medidorId', data.medidorId);
        cargarLectura.append('tarifaId', data.tarifaId);
  
        console.log("datos a enviar  ....", data);
        console.log("que datos cargaste", cargarLectura);
        this.lecturacionService.postGuardarLectura(cargarLectura)
          .subscribe((data: any) => {
            console.log("esta aqui saltando");
            this.dialogRef.close(1);
          }, (error: any) => {
            this.dialogRef.close(2);
            console.log("esta aqui y no guarda");
          });
      } else {
        console.log("No se encontró una tarifa válida para el consumo proporcionado.");
      }
    });
    
    
  }

  
  asiganaTarifa(consumo : number) : Observable <number>{
    let maxConsumo : number = 0;
    let maxIdTarifa : number = 0;
    let maxPrecioTarifa : number = 0;
    console.log("entro a asigna tarifa")
    return this.tarifaService.getTarifasActivas().pipe(
      map((resp: any) => {
        if (resp.metadata[0].code === "00") {
          let tarifasActivas = resp.tarifaResponse.tarifa;
          let i=0
          for (const tarifa of tarifasActivas) {
            console.log("enel for ",i++)
            if (consumo >= tarifa.minConsumo  && consumo <= tarifa.maxConsumo  ) {
              console.log("precio del comsumo por presio consimo",consumo)
              console.log("preciode la tarifa asignada",tarifa.precio)
              console.log(typeof consumo,typeof tarifa.precio )
              this.precioTotalLectura=consumo*tarifa.precio;
              console.log(this.precioTotalLectura)
              return tarifa.idTarifa;
            }
            maxConsumo=tarifa.maxConsumo;
            maxIdTarifa=tarifa.idTarifa;
            maxPrecioTarifa=tarifa.precio;
            console.log("valor maximo de la ultima tarifa",maxConsumo)
            if(consumo >= maxConsumo ){
              this.precioTotalLectura = consumo * maxPrecioTarifa;
              console.log("precio total superando la tarifas", this.precioTotalLectura);
              console.log("tarifa asignada ",maxIdTarifa );
              
            }
          }
          return maxIdTarifa;
        }
        return null;
      })
    );
         
  }

  fechaYLEctAnteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valorLecActual = control.value;
      console.log("que valor obtines del html",valorLecActual);
      console.log("que valor estas cicmparando",this.lecturaAnt);
      
      const valorLecAnte = parseInt(this.lecturaAnt)
      if (valorLecActual <= valorLecAnte ) {
        return { esMayor: true };
      }
      return null;
    };
  }

  listarAsistenciasPorMes(){
  	this.asisteciaService.getBuscarAsisMesAnho(this.data)
          .subscribe( (resp : any) => {
              this.processAsistenciaPorMes(resp);
          }, (error : any) => {
            console.log(error)
          })
  }

  processAsistenciaPorMes(resp : any){

    const datoAsistencia : AsistenciaElement[] = [];
      if(resp.metadata[0].code === "00"){
    
      let listaAsistencia = resp.asistenciaResponse.asistencia;

        listaAsistencia.forEach((element : AsistenciaElement) => {
          
          this.asistenciaDelMes.push(element);
          
        });

      } 

    }

   processMultaDeAsistencia(idSocio : number){

    console.log("es el id de cosiompata ver si tiene reunion",idSocio);

    console.log(this.asistenciaDelMes);
    this.suMultaPorReunion=0;
    this.asistenciaDelMes.forEach( (element : AsistenciaElement ) => {
      console.log("ïd socio que recube",idSocio," tipo de dado",typeof idSocio);
      console.log("asistencias del mes con idSocio",element.socio.idSocio," tipo de dado",typeof element.socio.idSocio);
      if(element.socio.idSocio === idSocio ){
        console.log("esta en el if verificando socio")
        console.log("que valor tienes",element.estado)

        if(element.estado == "Presente"){
            console.log("no tienen multa ppara asignar");
            this.suMultaPorReunion = 0;
        }
        if(element.estado == "Falta"){
          console.log(" tienen multa ");
          this.suMultaPorReunion = 20;
        }
        if(element.estado == "Retraso"){
          console.log(" tienen multa ");
          this.suMultaPorReunion = 5;
        }
      }
    })

    
   } 
 
 
}






export interface MedidorElement {
  idMedidor: number;
  serie:     string;
  direccion: string;
  estado:    boolean;
  lecturaInical : number;
  socio:     any;
}

export interface SocioElement {
  ci:              string;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idSocio:         number;
  fechaRegistro:   Date;
}

export interface LecturacionElement {
  idLecturacion:   number;
  mesLecturacion:  string;
  lecturaAnterior: number;
  lecturaActual:   number;
  consumo:         number;
  medidor:         any;
}

export interface TarifaElement{
  idTarifa:    number;
  nombre:      string;
  maxConsumo:  number;
  minConsumo:  number;
  precio:      number;
  estado:      boolean;
}

export interface AsistenciaElement{
  idAsistencia: number;
  estado:       string;
  reunion:      any;
  socio:        any;
}

export interface ReunionElement {
  idReunion:      number;
  mesAnhoReunion: string;
  descripcion:    string;
  estado:         boolean;
}

export interface SocioElement {
  ci:              string;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idSocio:         number;
  fechaRegistro:   Date;
}