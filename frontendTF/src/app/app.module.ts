import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './modules/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListAlumnoComponent } from './components/alumno/list-alumno/list-alumno.component';
import { DetailAlumnoComponent } from './components/alumno/detail-alumno/detail-alumno.component';
import { DetailAsesorComponent } from './components/asesor/detail-asesor/detail-asesor.component';
import { ListAsesorComponent } from './components/asesor/list-asesor/list-asesor.component';
import { ListCanalContactoComponent } from './components/canalContacto/list-canal-contacto/list-canal-contacto.component';
import { DetailCanalContactoComponent } from './components/canalContacto/detail-canal-contacto/detail-canal-contacto.component';
import { ListOpinionComponent } from './components/opinion/list-opinion/list-opinion.component';
import { DetailOpinionComponent } from './components/opinion/detail-opinion/detail-opinion.component';
import { DetailCursoComponent } from './components/curso/detail-curso/detail-curso.component';
import { ListCursoComponent } from './components/curso/list-curso/list-curso.component';
import { ListHorarioComponent } from './components/horario/list-horario/list-horario.component';
import { DetailHorarioComponent } from './components/horario/detail-horario/detail-horario.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilAlumnoComponent } from './components/alumno/perfil-alumno/perfil-alumno.component';
import { PerfilAsesorComponent } from './components/asesor/perfil-asesor/perfil-asesor.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { ListAsesoriaComponent } from './components/asesoria/list-asesoria/list-asesoria.component';
import { DetailAsesoriaComponent } from './components/asesoria/detail-asesoria/detail-asesoria.component';
import { ListAsesorCursoComponent } from './components/asesor-curso/list-asesor-curso/list-asesor-curso.component';
import { DetailAsesorCursoComponent } from './components/asesor-curso/detail-asesor-curso/detail-asesor-curso.component';
import { RegisterComponent } from './components/register/register.component';
import { AlumnoCursoComponent } from './components/alumno-curso/alumno-curso.component';
import { DetailAlumnoCursoComponent } from './components/alumno-curso/detail-alumno-curso/detail-alumno-curso.component';
import { ListAlumnoCursoComponent } from './components/alumno-curso/list-alumno-curso/list-alumno-curso.component';
import { RegisterAsesoriaComponent } from './components/asesoria/register-asesoria/register-asesoria.component';
import { HomeAlumnoComponent } from './components/home/home-alumno/home-alumno.component';
import { AutorizadorInterceptor } from './interceptors/autorizador';


@NgModule({
  declarations: [
    AppComponent,
    ListAlumnoComponent,
    DetailAlumnoComponent,
    DetailAsesorComponent,
    ListAsesorComponent,
    ListCanalContactoComponent,
    DetailCanalContactoComponent,
    ListOpinionComponent,
    DetailOpinionComponent,
    DetailCursoComponent,
    ListCursoComponent,
    ListHorarioComponent,
    DetailHorarioComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PerfilAlumnoComponent,
    PerfilAsesorComponent,
    LoginComponent,
    RegistrarComponent,
    ConfirmacionComponent,
    ListAsesoriaComponent,
    DetailAsesoriaComponent,
    ListAsesorCursoComponent,
    DetailAsesorCursoComponent,
    RegisterComponent,
    AlumnoCursoComponent,
    DetailAlumnoCursoComponent,
    ListAlumnoCursoComponent,
    RegisterAsesoriaComponent,
    HomeAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass:AutorizadorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}