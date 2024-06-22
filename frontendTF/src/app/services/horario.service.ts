import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "horario"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllHorarios(){
    return this.clienteHTTP.get<Horario[]>(this.servidor+"/"+this.recurso);
  }
  getHorario(id:number){
    return this.clienteHTTP.get<Horario>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
  postHorario(alumno:Horario){
    return this.clienteHTTP.post<Horario>(this.servidor+"/"+this.recurso,alumno);
  }
  putHorario(alumno:Horario){
    return this.clienteHTTP.put<Horario>(this.servidor+"/"+this.recurso,alumno 
      + "/" + alumno.id.toString());
  }
  deleteHorario(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
