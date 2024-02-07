import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor( private http:HttpClient) { }

  getAsistecias(){
    const endpoint = `${base_url}/asistencia`;
    return this.http.get(endpoint);
  }

  postAsistencia(body : any){
    const endpoint = `${base_url}/asistencia`;
    return this.http.post(endpoint,body);
  }

  //actualizar estado
  actualizarEstado(body : any , id : any){
    const endpoint = `${base_url}/asistencia/${id}`;
    return this.http.put(endpoint,body);
  }
  
  // buscar Asistencia por ci de socio
  getBuscarAsisPorCiSocio( caracter : any){
    const endpoint = `${base_url}/asistencia/filtro/${caracter}`;
    return this.http.get(endpoint);
  }

  // buscar Asistencia por mes
  getBuscarAsisMesAnho( caracter : any){
    const endpoint = `${base_url}/asistencia/filtroMesAnho/${caracter}`;
    return this.http.get(endpoint);
  }

  // buscar Asistencia por mes en curso
  getListarAsisMesEnCurso( caracter : any){
    const endpoint = `${base_url}/asistencia/filtroMesEnCurso/${caracter}`;
    return this.http.get(endpoint);
  }

  ///listar segun mes en cursi y caracteres de ci
  getBuscarAsisPorCiSocioMesAnho( caracter : any, mesAnho : string){
    const endpoint = `${base_url}/asistencia/filtroCiMesAnho?ci=${caracter}&mesAnho=${mesAnho}`;
    return this.http.get(endpoint);
  }
}
