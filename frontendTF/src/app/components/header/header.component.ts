import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import { MatDialog,MatDialogConfig } from '@angular/material/dialog'
import { PerfilAlumnoComponent } from '../alumno/perfil-alumno/perfil-alumno.component'

;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly dialog =inject(MatDialog);
  openDialog(){
    const dialogRef = this.dialog.open(PerfilAlumnoComponent);
    dialogRef.afterClosed().subscribe(result=>
      {
        console.log('Dialog result:${result}');
      }
    );
  }
}
