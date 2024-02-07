import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http : HttpClient) { }


  getUsuario(){
    const endpoint = `${base_url}/usuarios`;
    return this.http.get(endpoint);
  }
  //consumir la url de guradar usuario
  postUsuario( body : any ){
    const endpoint = `${base_url}/usuarios`;
    return this.http.post(endpoint, body);
  }

  // cosumir la url de actualizar usuario
  putUsuario(body : any , idUsuario : number){
    const endpoint = `${base_url}/usuarios/${idUsuario}`;
    return this.http.put(endpoint , body);
  }  

   // cosumir la url de cambiar usuario
   eliminarUsuario(body : any , idUsuario : number){
    const endpoint = `${base_url}/usuarios/eliminar/${idUsuario}`;
    return this.http.put(endpoint , body);
  }  

  getUsuarioActivos(){
    const endpoint = `${base_url}/usuarios/activos`;
    return this.http.get(endpoint);
  }

  getCaracterBuscar( palabra : any){
    const endpoint = `${base_url}/usuarios/filtro/${palabra}`;
    return this.http.get(endpoint);
  }

}
