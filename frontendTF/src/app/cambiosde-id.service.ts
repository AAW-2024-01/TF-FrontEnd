import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CambiosdeIdService {

  constructor() { }
  idAsesor: number=0;
  idAlumno: number=0;

  setAsesorId(newId: number) {
    // Verificar si ya existe un id asignado antes de sobrescribirlo
    if (this.idAsesor === 0) {
      this.idAsesor = newId;
    }
  }
  getAsesorId()
  {
    return this.idAsesor;
  }
  setAlumnoId(newId:number)
  {
    this.idAlumno=newId;
  }
  getAlumnoId()
  {
    return this.idAlumno;
  }
}
