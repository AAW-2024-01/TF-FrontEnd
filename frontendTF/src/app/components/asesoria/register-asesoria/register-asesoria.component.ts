import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetalleHorario } from '../../../models/detalle-horario';

interface Estado {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register-asesoria',
  templateUrl: './register-asesoria.component.html',
  styleUrl: './register-asesoria.component.css'
})
export class RegisterAsesoriaComponent {
  detalleFormGroup!:FormGroup;
  estados: Estado[] = [
    {value: 'RESERVADA', viewValue: 'RESERVADA'},
    {value: 'REALIZADA', viewValue: 'REALIZADA'},
    {value: 'CANCELADA', viewValue: 'CANCELADA'},
  ];
  listDetalleHorario:DetalleHorario[]=[];
  
}
