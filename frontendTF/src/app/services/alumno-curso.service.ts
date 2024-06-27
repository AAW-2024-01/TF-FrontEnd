import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsesorCurso } from '../models/asesor-curso';
import { Curso } from '../models/curso';
import { AlumnoCurso } from '../models/alumno-curso';

@Injectable({
  providedIn: 'root'
})
export class AlumnoCursoService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "alumno_curso"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllAsesorCurso(){
    return this.clienteHTTP.get<AlumnoCurso[]>(this.servidor+"/"+this.recurso);
  }
  getAlumnoCurso(id:number){
    return this.clienteHTTP.get<AlumnoCurso>(this.servidor+"/"+this.recurso + "/" + id!.toString());
  }
  getAlumnoCursoByAlumnoId(id:number){
    return this.clienteHTTP.get<AlumnoCurso[]>(this.servidor+"/"+this.recurso + "/asesor" + "/" + id.toString());
  }
  postAlumnoCurso(alumnoCurso:AlumnoCurso){
    return this.clienteHTTP.post<AlumnoCurso>(this.servidor+"/"+this.recurso,alumnoCurso);
  }
  putAlumnoCurso(alumnoCurso:AlumnoCurso){
    return this.clienteHTTP.put<AlumnoCurso>(this.servidor+"/"+this.recurso,alumnoCurso 
      + "/" + alumnoCurso.id.toString());
  }
  deleteAlumnoCurso(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
