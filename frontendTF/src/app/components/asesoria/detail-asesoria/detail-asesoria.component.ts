import { Component, OnInit } from '@angular/core';
import { AsesoriaService } from '../../../services/asesoria.service';


@Component({
  selector: 'app-detail-asesoria',
  templateUrl: './detail-asesoria.component.html',
  styleUrl: './detail-asesoria.component.css'
})
export class DetailAsesoriaComponent implements OnInit {
  asesorias: any[] = [];

  constructor(private asesoriaService: AsesoriaService) {}

  ngOnInit() {
    this.obtenerAsesorias();
  }

  obtenerAsesorias() {
    this.asesoriaService.obtenerAsesorias().subscribe(
      data => {
        this.asesorias = data;
      },
      error => {
        alert('Error al obtener las asesorías.');
      }
    );
  }

  cancelarAsesoria(asesoriaId: number) {
    this.asesoriaService.cancelarAsesoria(asesoriaId).subscribe(
      response => {
        alert('Asesoría cancelada exitosamente.');
        this.asesorias = this.asesorias.filter(asesoria => asesoria.id !== asesoriaId);
      },
      error => {
        alert('Hubo un error al cancelar la asesoría.');
      }
    );
  }
  
}
