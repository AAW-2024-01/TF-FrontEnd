import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  constructor() { }
  tipo: string="";

  setTipo(newTipo:string)
  {
    this.tipo=newTipo;
  }
  getTipo()
  {
    return this.tipo;
  }
}
