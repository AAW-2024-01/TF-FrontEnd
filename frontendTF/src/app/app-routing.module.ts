import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlumnoComponent } from './components/alumno/list-alumno/list-alumno.component';
import { ListAsesorComponent } from './components/asesor/list-asesor/list-asesor.component';
import { ListCursoComponent } from './components/curso/list-curso/list-curso.component';
import { ListCanalContactoComponent } from './components/canalContacto/list-canal-contacto/list-canal-contacto.component';
import { DetailCanalContactoComponent } from './components/canalContacto/detail-canal-contacto/detail-canal-contacto.component';
import { DetailCursoComponent } from './components/curso/detail-curso/detail-curso.component';
import { ListHorarioComponent } from './components/horario/list-horario/list-horario.component';
import { DetailHorarioComponent } from './components/horario/detail-horario/detail-horario.component';
import { ListOpinionComponent } from './components/opinion/list-opinion/list-opinion.component';
import { DetailOpinionComponent } from './components/opinion/detail-opinion/detail-opinion.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilAlumnoComponent } from './components/alumno/perfil-alumno/perfil-alumno.component';
import { DetailAlumnoComponent } from './components/alumno/detail-alumno/detail-alumno.component'; 
import { DetailAsesorComponent } from './components/asesor/detail-asesor/detail-asesor.component';
import { PerfilAsesorComponent } from './components/asesor/perfil-asesor/perfil-asesor.component';

const routes: Routes = [

  {path:"list-alumno",component:ListAlumnoComponent},
  {path:"list-asesor",component:ListAsesorComponent},
  {path:"list-canal-contacto",component:ListCanalContactoComponent},
  {path:"detail-canal-contacto",component:DetailCanalContactoComponent},
  {path:"list-curso",component:ListCursoComponent},
  {path:"detail-curso",component:DetailCursoComponent},
  {path:"list-horario",component:ListHorarioComponent},
  {path:"detail-horario",component:DetailHorarioComponent},
  {path:"list-opinion",component:ListOpinionComponent},
  {path:"detail-opinion",component:DetailOpinionComponent}
  {path:"",component:HomeComponent},
  {path:"header",component:HeaderComponent},
  {path:"footer",component:FooterComponent},
  {path:"perfilalumno",component:PerfilAlumnoComponent} , 
  {path:"perfilasesor",component:PerfilAsesorComponent} , 
  {path:"perfileditalumno",component:DetailAlumnoComponent},
  {path:"perfileditasesor",component:DetailAsesorComponent}  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
