import { Injectable } from '@angular/core';
import { Asesoria } from '../models/asesoria';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "asesoria"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllAsesorias(){
    return this.clienteHTTP.get<Asesoria[]>(this.servidor+"/"+this.recurso);
  }
  getAsesoria(id:number){
    return this.clienteHTTP.get<Asesoria>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }

  postAsesoria(alumno:Asesoria){
    return this.clienteHTTP.post<Asesoria>(this.servidor+"/"+this.recurso,alumno);
  }
  putAsesoria(alumno:Asesoria){
    return this.clienteHTTP.put<Asesoria>(this.servidor+"/"+this.recurso,alumno 
      + "/" + alumno.id.toString());
  }
  deleteAsesoria(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }

  
}
