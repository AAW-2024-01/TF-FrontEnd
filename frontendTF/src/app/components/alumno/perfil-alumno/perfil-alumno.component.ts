import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { DetailAlumnoComponent } from '../detail-alumno/detail-alumno.component';



@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrl: './perfil-alumno.component.css'
})
export class PerfilAlumnoComponent {
  readonly dialog =inject(MatDialog);
  openEditar(){
    //console.log('editar');
    const dialogRef = this.dialog.open(DetailAlumnoComponent);
    dialogRef.afterOpened().subscribe(result=>
      {
        console.log('editar');
      }
    );
  }
}
