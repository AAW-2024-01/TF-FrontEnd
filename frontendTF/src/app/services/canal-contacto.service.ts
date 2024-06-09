import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanalContacto } from '../models/canal-contacto';

@Injectable({
  providedIn: 'root'
})
export class CanalContactoService {
  servidor:string = "http://localhost:8080/api";
  recurso:string = "asesor"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllCanalContactos(){
    return this.clienteHTTP.get<CanalContacto[]>(this.servidor+"/"+this.recurso);
  }
  getCanalContacto(id:number){
    return this.clienteHTTP.get<CanalContacto>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
  postCanalContacto(alumno:CanalContacto){
    return this.clienteHTTP.post<CanalContacto>(this.servidor+"/"+this.recurso,alumno);
  }
  putCanalContacto(alumno:CanalContacto){
    return this.clienteHTTP.put<CanalContacto>(this.servidor+"/"+this.recurso,alumno 
      + "/" + alumno.id.toString());
  }
  deleteCanalContacto(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
