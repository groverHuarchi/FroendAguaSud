import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  constructor( private http: HttpClient) { }

  //obteniendo los socios de apirest
  getSocio(){

    const endpoint = `${base_url}/socios`;
    return this.http.get(endpoint);
  }

  // llamando al servicio de guardar socios
  guardarSocios(body : any){
    const endpoint = `${base_url}/socios`;
    return this.http.post(endpoint,body);
  }

  //llamando al servico del bacend actualizar socio
  actualizar( body : any, id : any){
    const endpoint = `${base_url}/socios/${id}`;
    return this.http.put(endpoint,body);
  }

  //buscar por id de socio
  buscarPorIdSocio(id : any){
    const endpoint =`${base_url}/socios/${id}`;
    return this.http.get(endpoint)
  }

   //buscar Socio por nombre Ap Am Ci
   buscarSocioCiNomAmAP(caracter : any){
    const endpoint =`${base_url}/socios/filtro/${caracter}`;
    return this.http.get(endpoint)
  }

  //buscar Socio por nombre Ap Am Ci
  buscarSocioCi(ci : any){
    const endpoint =`${base_url}/socios/ci/${ci}`;
    return this.http.get(endpoint)
  }
}
