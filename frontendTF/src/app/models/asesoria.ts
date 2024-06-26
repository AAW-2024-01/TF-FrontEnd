import { Alumno } from "./alumno";
import { Curso } from "./curso";

export interface Asesoria{
    id:number,
    alumno:Alumno,
    curso:Curso,
    montoCobrado:number,
    estado:string
}