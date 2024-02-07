import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor( private http : HttpClient) { }

  // obteniendo todos los datos de tarifas
  getTarifas(){
    const endpoint = `${base_url}/tarifas`;
    return this.http.get(endpoint);
  }

  postTarifas(body : any){
    const endpoint = `${base_url}/tarifas`;
    return this.http.post(endpoint, body);
  }

  putTarifas(body :any , id : any){
    const endpoint = `${base_url}/tarifas/${id}`;
    return this.http.put(endpoint, body);
  }

  putCambiarEstado(body : any , idTarifa : number ){
    const endpoint = `${base_url}/tarifas/eliminar/${idTarifa}`;
    return this.http.put(endpoint, body);
  }

  getTarifasActivas(){
    const endpoint = `${base_url}/tarifas/activas`;
    return this.http.get(endpoint);
  }

  getTarifasInactivas(){
    const endpoint = `${base_url}/tarifas/inactivas`;
    return this.http.get(endpoint);
  }

  getTarifaPorNombre(caracter : String){
    const endpoint = `${base_url}/tarifas/filtro/${caracter}`;
    return this.http.get(endpoint);
  }

}
