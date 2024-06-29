import { Asesor } from "./asesor";
import { LocalTime } from '@js-joda/core';
import { DetalleHorario } from "./detalle-horario";

export interface Horario{
    id:number;
    dia:string;
    asesor:Asesor;
    //detalle:DetalleHorario;
}    