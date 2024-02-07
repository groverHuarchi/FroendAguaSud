import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReciboService {

  constructor(private http : HttpClient) { }

  getRecibos(){
    const endpoint = `${base_url}/recibos`;
    return this.http.get(endpoint);
  }

  getRecibosConDeuda(){
    const endpoint = `${base_url}/recibos/sinCancelar`;
    return this.http.get(endpoint);
  }

  getRecibosPorMedidorConDeuda(medidorId : any){
    const endpoint = `${base_url}/recibos/sinCancelar/${medidorId}`;
    return this.http.get(endpoint);
  }

  getMedidoresParaCorte(){
    const endpoint = `${base_url}/recibos/corte`;
    return this.http.get(endpoint);
  }

  getRecibostotalesMes(mes : String){
    const endpoint = `${base_url}/recibos/totalRecibos/${mes}`;
    return this.http.get(endpoint);
  }

  getRecibosPagadosMes(mes : String){
    const endpoint = `${base_url}/recibos/pagados/${mes}`;
    return this.http.get(endpoint);
  }

  getRecibosPorCobrarMes(mes : String){
    const endpoint = `${base_url}/recibos/porCobrar/${mes}`;
    return this.http.get(endpoint);
  }

  getRecibosBetween(fechaInicio : Date , fechaFin : Date){
    const endpoint = `${base_url}/recibos/pagadosBetween?fechaInicio=${fechaInicio.toISOString()}&fechaFin=${fechaFin.toISOString()}`;
    return this.http.get(endpoint);
  }

  putReciboEstadoPagado( body : any, idRecibo : number){
    const endpoint = `${base_url}/recibos/${idRecibo}`;
    return this.http.put(endpoint, body);
  }

  getEstadoREciboPorIdLecturacion(idLecturacion : any){
    const endpoint = `${base_url}/recibos/verificaEstadoRecibo/${idLecturacion}`;
    return this.http.get(endpoint);
  }
}
