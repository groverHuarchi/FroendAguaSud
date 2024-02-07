import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  constructor( private http:HttpClient) { }

  getReuniones(){

    const endpoint = `${base_url}/reunion`;
    return this.http.get(endpoint);

  }

  getExisteReunion(caracter : string){
    const endpoint = `${base_url}/reunion/${caracter}`;
    return this.http.get(endpoint);
  }

  getReunionEnEspera(){
    const endpoint = `${base_url}/reunion/enEspera`;
    return this.http.get(endpoint);
  }

  postGuardarReunion( body : any ){
    const endpoint = `${base_url}/reunion`;
    return this.http.post(endpoint,body);
  }

  putActualizarReunion(body : any, idReunion : number){
    const endpoint = `${base_url}/reunion/${idReunion}`;
    return this.http.put(endpoint,body);
  }

  getReunionCaracter(caracter : String){
    const endpoint = `${base_url}/reunion/filtro/${caracter}`;
    return this.http.get(endpoint);
  }
}
