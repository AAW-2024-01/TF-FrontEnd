import { Component, inject} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PerfilAlumnoComponent } from '../alumno/perfil-alumno/perfil-alumno.component'

;
import { DetailAsesorComponent } from '../asesor/detail-asesor/detail-asesor.component';
import { PerfilAsesorComponent } from '../asesor/perfil-asesor/perfil-asesor.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
//intercambiar asesor y alumno
export class HeaderComponent {
   currentText: string = 'Alumno';
   previousText: string = 'Asesor';
  toggleText(): void {
    const tempText = this.currentText;
    this.currentText = this.previousText;
    this.previousText = tempText;
  }

//switch para cambiar el acceso segun el tipo de usuario
  readonly dialog =inject(MatDialog);
  openDialog(): void {
    switch (this.currentText) {
      case 'Alumno':
        this.dialog.open(PerfilAlumnoComponent);
        break;
      case 'Asesor':
        this.dialog.open(PerfilAsesorComponent);
        break;
      default:
        console.warn(`Unsupported text value: ${this.currentText}`);
    }
  }


}
