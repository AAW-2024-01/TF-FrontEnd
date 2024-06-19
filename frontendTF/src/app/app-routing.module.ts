import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilAlumnoComponent } from './components/alumno/perfil-alumno/perfil-alumno.component';
import { DetailAlumnoComponent } from './components/alumno/detail-alumno/detail-alumno.component'; 
import { DetailAsesorComponent } from './components/asesor/detail-asesor/detail-asesor.component';
import { PerfilAsesorComponent } from './components/asesor/perfil-asesor/perfil-asesor.component';


const routes: Routes = [
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
