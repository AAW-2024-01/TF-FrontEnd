import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asesor } from '../models/asesor';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "asesor"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllAsesors(){
    return this.clienteHTTP.get<Asesor[]>(this.servidor+"/"+this.recurso);
  }
  getAsesor(id:number){
    return this.clienteHTTP.get<Asesor>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
  postAsesor(alumno:Asesor){
    return this.clienteHTTP.post<Asesor>(this.servidor+"/"+this.recurso,alumno);
  }
  putAsesor(alumno:Asesor){
    return this.clienteHTTP.put<Asesor>(this.servidor+"/"+this.recurso,alumno 
      + "/" + alumno.id.toString());
  }
  deleteAsesor(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
