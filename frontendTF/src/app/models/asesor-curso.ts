import { Asesor } from "./asesor";
import { Curso } from "./curso";

export interface AsesorCurso{
    id:number;
    nivelDominio:number;
    asesor:Asesor;
    curso:Curso;
}