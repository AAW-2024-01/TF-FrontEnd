import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  servidor:string = "http://localhost:8080/api";
  recurso:string = "alumno"
  constructor(private clienteHTTP:HttpClient) { }

  //METODOS CRUD DEL BACKEND
  getAllAlumnos(){
    return this.clienteHTTP.get<Alumno[]>(this.servidor+"/"+this.recurso);
  }
  getAlumno(id:number){
    return this.clienteHTTP.get<Alumno>(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
  postAlumno(alumno:Alumno){
    return this.clienteHTTP.post<Alumno>(this.servidor+"/"+this.recurso,alumno);
  }
  putAlumno(alumno:Alumno){
    return this.clienteHTTP.put<Alumno>(this.servidor+"/"+this.recurso,alumno 
      + "/" + alumno.id.toString());
  }
  deleteAlumno(id:number){
    return this.clienteHTTP.delete(this.servidor+"/"+this.recurso + "/" + id.toString());
  }
}
