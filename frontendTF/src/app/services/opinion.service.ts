import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opinion } from '../models/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  servidor:string = "http://localhost:8080/api";
  recurso:string = "asesor"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllOpinions(){
    return this.clienteHTTP.get<Opinion[]>(this.servidor+"/"+this.recurso);
  }
  getOpinion(id:number){
    return this.clienteHTTP.get<Opinion>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
  postOpinion(alumno:Opinion){
    return this.clienteHTTP.post<Opinion>(this.servidor+"/"+this.recurso,alumno);
  }
  putOpinion(alumno:Opinion){
    return this.clienteHTTP.put<Opinion>(this.servidor+"/"+this.recurso,alumno 
      + "/" + alumno.id.toString());
  }
  deleteOpinion(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
