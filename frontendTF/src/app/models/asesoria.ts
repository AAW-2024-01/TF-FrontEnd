// asesoria.model.ts

export enum AsesoriaEstado {
    PENDIENTE = 'PENDIENTE',
    REALIZADA = 'REALIZADA',
    CANCELADA = 'CANCELADA'
  }
  
  export interface Asesoria {
    id: number;
    fechaRegistro: Date;
    tarifaPactadas: number;
    fechaRealizado: Date;
    calificacionAsesor: number;
    calificacionAlumno: number;
    estado: AsesoriaEstado;
    horaInicio: string;  // Usamos string para Time
    horaFin: string;     // Usamos string para Time
    duracion: number;
    montoCobrado: number;
    alumnoId: number;
    asesorId: number;
    cursoId: number;
  }
  
  