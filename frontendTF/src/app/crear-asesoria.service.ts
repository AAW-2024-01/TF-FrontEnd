import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearAsesoriaService {

  constructor() { }
  curso: number=0;
  asesor: number=0;

  setCurso(newCurso:number)
  {
    this.curso=newCurso;
  }
  getCurso()
  {
    return this.curso;
  }
  setAsesor(newAsesor:number)
  {
    this.asesor=newAsesor;
  }
  getAsesor()
  {
    return this.asesor;
  }
}
