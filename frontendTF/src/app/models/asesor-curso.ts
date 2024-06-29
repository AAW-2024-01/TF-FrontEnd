import { Asesor } from "./asesor";
import { Curso } from "./curso";

export interface AsesorCurso{
    id:number;
    //nivelDominio:number;
    carrera:string;
    asesor:Asesor;
    curso:Curso;
}