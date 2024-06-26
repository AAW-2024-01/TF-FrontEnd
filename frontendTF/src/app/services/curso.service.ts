import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "asesor"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllCursos(){
    return this.clienteHTTP.get<Curso[]>(this.servidor+"/"+this.recurso);
  }
  getCurso(id:number){
    return this.clienteHTTP.get<Curso>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
  postCurso(alumno:Curso){
    return this.clienteHTTP.post<Curso>(this.servidor+"/"+this.recurso,alumno);
  }
  putCurso(alumno:Curso){
    return this.clienteHTTP.put<Curso>(this.servidor+"/"+this.recurso,alumno 
      + "/" + alumno.id.toString());
  }
  deleteCurso(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
