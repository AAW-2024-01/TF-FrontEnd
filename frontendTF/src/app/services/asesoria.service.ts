import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asesoria } from '../models/asesoria';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "asesoria"
  constructor(private clienteHTTP:HttpClient) { }

  obtenerAsesorias(): Observable<any[]> {
    return this.clienteHTTP.get<any[]>(this.servidor);
  }

  cancelarAsesoria(asesoriaId: number): Observable<any> {
    return this.clienteHTTP.delete(`${this.servidor}/${asesoriaId}`);
  }
  registrarAesoria(asesoria:Asesoria){
    return this.clienteHTTP.post<Asesoria>(this.servidor+"/"+this.recurso,asesoria);
  }
  reprogramarAsesoria(asesoriaId: number, nuevaFecha: Date, nuevaHoraInicio: string, nuevaHoraFin: string): Observable<Asesoria> {
    const url = `${this.servidor}/${asesoriaId}/reprogramar`;
    const body = {
      fechaRealizado: nuevaFecha,
      horaInicio: nuevaHoraInicio,
      horaFin: nuevaHoraFin
    };
    return this.clienteHTTP.put<Asesoria>(url, body);
  }
}
