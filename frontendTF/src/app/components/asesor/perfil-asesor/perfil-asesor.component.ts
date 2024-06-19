import { Component,inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { DetailAsesorComponent } from '../detail-asesor/detail-asesor.component';

@Component({
  selector: 'app-perfil-asesor',
  templateUrl: './perfil-asesor.component.html',
  styleUrl: './perfil-asesor.component.css'
})
export class PerfilAsesorComponent {
  readonly dialog =inject(MatDialog);
  openEditar(){
    //console.log('editar');
    const dialogRef = this.dialog.open(DetailAsesorComponent);
  }
}
