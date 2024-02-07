import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LecturacionService {



  constructor( private http : HttpClient) { }


  getLecturacion(){
    const endpoint = `${base_url}/lecturaciones`;
    return this.http.get(endpoint);
  }

  getLecturasAnteriores(medidor : any){
    const endpoint = `${base_url}/lecturaciones/medidor/${medidor}`;
    return this.http.get(endpoint);
  }

  postGuardarLectura(body : any){
    const endpoint = `${base_url}/lecturaciones`;
    return this.http.post(endpoint,body);
  }

  putActualizarLectura(body: any, id : number){
    const endpoint = `${base_url}/lecturaciones/${id}`;
    return this.http.put(endpoint,body);
  }


}
