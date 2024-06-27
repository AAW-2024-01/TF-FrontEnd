import { Component, OnInit } from '@angular/core';
import { Asesoria, AsesoriaEstado } from '../../../models/asesoria';
import { AsesoriaService } from '../../../services/asesoria.service';



@Component({
  selector: 'app-registrar-asesoria',
  templateUrl: './registrar-asesoria.component.html',
  styleUrl: './registrar-asesoria.component.css'
})
export class RegistrarAsesoriaComponent implements OnInit {

  asesoria: Asesoria = {
    id:0,
    fechaRegistro: new Date(),
    tarifaPactadas: 0,
    fechaRealizado: new Date(),
    calificacionAsesor: 0,
    calificacionAlumno: 0,
    estado: AsesoriaEstado.PENDIENTE,
    horaInicio: '',
    horaFin: '',
    duracion: 0,
    montoCobrado: 0,
    alumnoId: 0,
    asesorId: 0,
    cursoId: 0
  };
 

  calendario: Asesoria[] = [];

  constructor(private asesoriaService: AsesoriaService) {}

  ngOnInit() {
    this.obtenerAsesoriasCalendario();
  }

  obtenerAsesoriasCalendario() {
    this.asesoriaService.obtenerAsesorias().subscribe(
      data => {
        this.calendario = data;
      },
      error => {
        alert('Error al obtener las asesorías para el calendario.');
      }
    );
  }

  reservarAsesoria() {
    this.asesoria.fechaRegistro = new Date(); // Set current date
    this.asesoria.estado = AsesoriaEstado.PENDIENTE;
    this.asesoriaService.registrarAesoria(this.asesoria).subscribe(
      response => {
        alert('Asesoría reservada exitosamente.');
        this.actualizarCalendario(response);
      },
      error => {
        alert('Hubo un error al reservar la asesoría.');
      }
    );
  }

  actualizarCalendario(nuevaAsesoria: Asesoria) {
    this.calendario.push(nuevaAsesoria);
  }
  reprogramarAsesoria(asesoriaId: number, nuevaFecha: Date, nuevaHoraInicio: string, nuevaHoraFin: string) {
    const confirmacion = confirm('¿Estás seguro de reprogramar esta asesoría?');
    if (!confirmacion) {
      return;
    }

    this.asesoriaService.reprogramarAsesoria(asesoriaId, nuevaFecha, nuevaHoraInicio, nuevaHoraFin).subscribe(
      response => {
        alert('Asesoría reprogramada exitosamente.');
        this.actualizarCalendario(response);
      },
      error => {
        alert('Hubo un error al reprogramar la asesoría.');
      }
    );
  }
}
