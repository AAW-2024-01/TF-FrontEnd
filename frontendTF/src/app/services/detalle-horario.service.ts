import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleHorario } from '../models/detalle-horario';

@Injectable({
  providedIn: 'root'
})
export class DetalleHorarioService {
  servidor:string = "http://localhost:8080/api";
  recurso:string = "detalleHorario"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllHorarios(){
    return this.clienteHTTP.get<DetalleHorario[]>(this.servidor+"/"+this.recurso);
  }
  getDetalleHorariosPorId(id:number){
    return this.clienteHTTP.get<DetalleHorario[]>(this.servidor+"/"+this.recurso + "/asesor" + "/" + id!.toString());
  }
  getDetalleHorariosPorAsesorId(id:number){
    return this.clienteHTTP.get<DetalleHorario[]>(this.servidor+"/"+this.recurso + "/asesor" + "/" + id!.toString());
  }
  getHorario(id:number){
    return this.clienteHTTP.get<DetalleHorario>(this.servidor+"/"+this.recurso + "/" + id!.toString());
  }
  
  postHorario(detalleHorario:DetalleHorario){
    return this.clienteHTTP.post<DetalleHorario>(this.servidor+"/"+this.recurso,detalleHorario);
  }
  putHorario(detalleHorario:DetalleHorario){
    return this.clienteHTTP.put<DetalleHorario>(this.servidor+"/"+this.recurso,detalleHorario 
      + "/" + detalleHorario.id.toString());
  }
  deleteHorario(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
