import { Alumno } from "./alumno";
import { Curso } from "./curso";

export interface AlumnoCurso{
    
    id:number;
    nivelDominio:number;
    alumno:Alumno;
    curso:Curso;
}