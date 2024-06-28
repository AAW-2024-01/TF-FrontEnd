import { Component,OnInit, inject} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PerfilAlumnoComponent } from '../alumno/perfil-alumno/perfil-alumno.component';
import { PerfilAsesorComponent } from '../asesor/perfil-asesor/perfil-asesor.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { TipoUsuarioService } from '../../tipo-usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
//intercambiar asesor y alumno
export class HeaderComponent implements OnInit {
  id:number=0;

  constructor (private usuarioServicio: UserService, private enrutador: Router,private ruta:ActivatedRoute,
    public tipo: TipoUsuarioService
  ){}
   currentText: string = 'Alumno';
   previousText: string = 'Asesor';
   



  toggleText(): void {
    const tempText = this.currentText;
    this.currentText = this.previousText;
    this.tipo.setTipo(this.currentText);
    this.previousText = tempText;
    if(this.usuarioServicio.getId()!=null)
      {
        switch(this.tipo.getTipo().toString())
         {
           case'Alumno':
           // console.log("Alumno");
           this.enrutador.navigate(["/homealumno"]);
           break;
           case'Asesor':
           this.enrutador.navigate(["/home"]);
           break;     
         }
      }
  }

  ngOnInit()
  {
    this.id = this.ruta.snapshot.params["id"];
    this.tipo.setTipo(this.currentText);
  }


homeSwitch():void
{
  switch (this.currentText)
  {
    case 'Alumno':
      this.enrutador.navigate(["/homealumno"]);
        break;
      case 'Asesor':
      this.enrutador.navigate(["/home"]);
        break;
  }
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
  

  logout(){
    this.usuarioServicio.logoutUsuario();
    this.enrutador.navigate(["/"]);
  }

  usuarioLogeado(){
    return this.usuarioServicio.getId()!=null;
  }

}
