import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsesorCurso } from '../models/asesor-curso';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class AsesorCursoService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "asesor_curso"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllAsesorCurso(){
    return this.clienteHTTP.get<AsesorCurso[]>(this.servidor+"/"+this.recurso);
  }
  getAsesorCurso(id:number){
    return this.clienteHTTP.get<AsesorCurso>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
  getCursosXAsesorID(id:number){
    return this.clienteHTTP.get<Curso[]>(this.servidor+"/"+this.recurso + "/curso" + "/asesor" + "/" + id.toString());
  }
  postAsesorCurso(asesorCurso:AsesorCurso){
    return this.clienteHTTP.post<AsesorCurso>(this.servidor+"/"+this.recurso,asesorCurso);
  }
  putAsesorCurso(asesorCurso:AsesorCurso){
    return this.clienteHTTP.put<AsesorCurso>(this.servidor+"/"+this.recurso,asesorCurso 
      + "/" + asesorCurso.id.toString());
  }
  deleteAsesorCurso(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
