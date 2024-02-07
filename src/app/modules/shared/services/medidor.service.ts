import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedidorService {

  constructor(private http : HttpClient) { }

  listaMedidoresActivosCorteSinCroquis(){
    const endpoint =`${base_url}/medidores/activosCorte`;
    return this.http.get(endpoint);
  }

  listaMedidoresActivosCorteReunion(){
    const endpoint =`${base_url}/medidores/activosCorteReunion`;
    return this.http.get(endpoint);
  }

  listaTodosMedidoresSerie(){
    const endpoint =`${base_url}/medidores/allSeries`;
    return this.http.get(endpoint);
  }

  guardarMedidor(body : any){
    const endpoint = `${base_url}/medidores`;
    return this.http.post(endpoint, body);
  }

  actualizarMedidor(body : any, id : any){
    const endpoint=`${base_url}/medidores/${id}`;
    return this.http.put(endpoint, body);
  }

  eliminarMedidor(body : any, id : any){
    const endpoint=`${base_url}/medidores/eliminar/${id}`;
    return this.http.put(endpoint, body);
  }

  buscarPorSerieMedidor(serie : any){
    const endpoint=`${base_url}/medidores/filtro/${serie}`;
    return this.http.get(endpoint);
  }

  buscarMedidorPorIdConCroquis(idMedidor : number){
    const endpoint = `${base_url}/medidores/conCroquis/${idMedidor}`;
    return this.http.get(endpoint);
  }
  buscarMedidorPorIdSinCroquis(idMedidor : number){
    const endpoint = `${base_url}/medidores/sinCroquis/${idMedidor}`;
    return this.http.get(endpoint);
  }

  listarMedidoresSocio(ci : string){

    const endpoint = `${base_url}/medidores/socios/${ci}`;
    return this.http.get(endpoint);
  }
}
