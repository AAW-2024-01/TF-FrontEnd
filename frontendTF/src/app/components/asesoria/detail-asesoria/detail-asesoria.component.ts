import { Component } from '@angular/core';
import { Curso } from '../../../models/curso';
import { AsesoriaService } from '../../../services/asesoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from '../../../services/curso.service';
import { Asesoria } from '../../../models/asesoria';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno';
import { Asesor } from '../../../models/asesor';
import { AsesorService } from '../../../services/asesor.service';
import { Horario } from '../../../models/horario';
import { HorarioService } from '../../../services/horario.service';
import { AsesorCursoService } from '../../../services/asesor-curso.service';
import { AsesorCurso } from '../../../models/asesor-curso';
import { UserService } from '../../../services/user.service';
import { DetalleHorario } from '../../../models/detalle-horario';
import { DetalleHorarioService } from '../../../services/detalle-horario.service';
import { MatTableDataSource } from '@angular/material/table';

interface Estado {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-detail-asesoria',
  templateUrl: './detail-asesoria.component.html',
  styleUrl: './detail-asesoria.component.css'
})
export class DetailAsesoriaComponent {
  detalleFormGroup!:FormGroup;
  id:number=0;
  listCursos:AsesorCurso[]=[];

  listAsesor:AsesorCurso[]=[];
  //listHorario:Horario[]=[];
  //listDetalleHorario:DetalleHorario[]=[];
  listCarrera:string[]=[];
  //el idAsesor se va jalar del local storage
  idAsesor:number=0;

  displayedColumns: string[]=["id","nombre","apellido","tarifa","experiencia","acciones"];
  horasInicio: any[] = [];
  horasFin:any;
  dias:string[]=[];
  dataSource!:MatTableDataSource<Asesor>;

  estados: Estado[] = [
    {value: 'RESERVADA', viewValue: 'RESERVADA'},
    {value: 'REALIZADA', viewValue: 'REALIZADA'},
    {value: 'CANCELADA', viewValue: 'CANCELADA'},
  ];
  constructor (private asesoriaService: AsesoriaService, private formBuilder:FormBuilder,
               private enrutador: Router, private _snackBar: MatSnackBar, private ruta:ActivatedRoute,
            private cursoService: CursoService, private alumnoService: AlumnoService,
            private asesorService: AsesorService, private horarioService:HorarioService,
            private asesorCursoService: AsesorCursoService, private userService:UserService,
            private detalleHorarioService:DetalleHorarioService) {};

  ngOnInit(){
    this.idAsesor = this.userService.getId()!;
    this.cargaAsesor();
    this.cargaHorario();
    this.cargaCursos();
  }

  cargaCursos(){
    this.asesorCursoService.getAsesorCursoByAsesorId(this.idAsesor).subscribe({
      next:(data:AsesorCurso[])=>{
        this.listCarrera = Array.from(new Set(data.map(x => x.carrera)));
        //this.listCursos = data.filter(asesorCurso=>asesorCurso.asesor.id===this.idAsesor)
        //.map(asesorCurso=>asesorCurso.curso);
        
      },
      error: (err)=>{
        console.log(err);        
      }
    })
  }

  cargaAsesor(){
    this.asesorCursoService.getAllAsesorCurso().subscribe({
      next:(data:AsesorCurso[])=>{
        this.dataSource = new MatTableDataSource();
      },
      error: (err)=>{
        console.log(err);        
      }
    })
  }
  cargaHorario(){
    this.detalleHorarioService.getDetalleHorariosPorAsesorId(this.idAsesor).subscribe({
      next:(data:DetalleHorario[])=>{
        //this.listDetalleHorario=data;
        //this.listHorario=data.map(x=>x.horario);
       // Obtener días únicos para usarlos como opciones en el select de horario
        this.dias = Array.from(new Set(data.map(horario => horario.horario.dia)));  

        // Inicialmente mostrar horarios del primer día
        if (this.dias.length > 0) {
         this.filtrarHorasPorDia(this.dias[0]); // Filtrar por el primer día
        }
    },
    error: (err) => {
      console.log(err);
    }
  });
  }
  filtrarHorasPorDia(diaSeleccionado: string) {
   // Filtrar horas de inicio y fin por el día seleccionado
    //const horariosDelDia = this.listDetalleHorario.filter(horario => horario.horario.dia === diaSeleccionado);
    //this.horasInicio = horariosDelDia.map(horario => horario.horaInicio);
    //this.horasFin = horariosDelDia.map(horario => horario.horaFin);
  
  }
  filterCarrera(event: any): void {
    const selectedCarrera = event.value;
    this.cargarCursosPorCarrera(selectedCarrera);
  }
  filterAsesores(event:any){
    const selectCurso = event.value;
    this.cargarAsesoresPorCurso(selectCurso)
  }
  cargarAsesoresPorCurso(idCurso:number){
    this.asesorCursoService.getAsesorByCursoId(idCurso).subscribe({
      next:(data:Asesor[])=>{
        this.dataSource = new MatTableDataSource(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  cargarCursosPorCarrera(carrera: string) {
    this.asesorCursoService.getAsesorCursoByCarrera(carrera).subscribe({
      next: (data: AsesorCurso[]) => {
        this.listCursos = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  validarAutoridad():boolean{
    if(this.userService.getAuthorities()! === "ROLE_TEACHER"){
      return true;
    }
    return false;
  }
  
}
