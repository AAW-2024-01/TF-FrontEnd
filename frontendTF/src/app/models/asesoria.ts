import { Alumno } from "./alumno";
import { Asesor } from "./asesor";
import { Curso } from "./curso";
import { DetalleHorario } from "./detalle-horario";
import { Horario } from "./horario";

export interface Asesoria{
    id:number,
    alumno:Alumno,
    asesor:Asesor,
    detalle:DetalleHorario
    //horario:Horario,
    curso:Curso,
    montoCobrado:number,
    estado:string
    
}