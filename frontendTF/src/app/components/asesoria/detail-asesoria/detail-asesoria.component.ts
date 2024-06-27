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
  listCursos:Curso[]=[];
  listAlumno:Alumno[]=[];
  listAsesor:Asesor[]=[];
  listHorario:Horario[]=[];
  //el idAsesor se va jalar del local storage
  idAsesor:number=0;
  
  horasInicio: any[] = [];
  horasFin:any;
  dias:string[]=[];

  estados: Estado[] = [
    {value: 'RESERVADA', viewValue: 'RESERVADA'},
    {value: 'REALIZADA', viewValue: 'REALIZADA'},
    {value: 'CANCELADA', viewValue: 'CANCELADA'},
  ];
  constructor (private asesoriaService: AsesoriaService, private formBuilder:FormBuilder,
               private enrutador: Router, private _snackBar: MatSnackBar, private ruta:ActivatedRoute,
            private cursoService: CursoService, private alumnoService: AlumnoService,
            private asesorService: AsesorService, private horarioService:HorarioService,
            private asesorCursoService: AsesorCursoService, private userService:UserService) {};


  ngOnInit(){
    this.idAsesor = this.userService.getId()!;
    this.cargaCursos();
    this.cargaAlumno();
    this.cargaAsesor();
    this.cargaHorario();
    this.crearFormGrup();
  }

  crearFormGrup(){
    this.detalleFormGroup = this.formBuilder.group({
      id:[""],
      alumno:[""],
      asesor:[""],
      curso:[""],
      horario:[""],
      monto:[""],
      estado:[""],
      horaInicio: [""],
      horaFin: [""]      
    });
     
    // Suscripción al cambio de horario para actualizar horasInicio y horasFin
    
  }

  grabarAsesoria(){
    const nuevaAsesoria:Asesoria={
      id: parseInt(this.detalleFormGroup.get("id")!.value),
      alumno:{id: this.detalleFormGroup.get("alumno")!.value, ciclo:0,nombre:"",apellido:""},
      asesor:{id:this.detalleFormGroup.get("asesor")!.value, nombre:"",apellido:"",tarifa:0,experiencia:""},
      curso:{id: this.detalleFormGroup.get("curso")!.value, nombre:"", ciclo:0},
      horario:{id: this.detalleFormGroup.get("horario")!.value, dia:"", horaInicio:"",horaFin:"",asesor:{id:this.detalleFormGroup.get("asesor")!.value, nombre:"",apellido:"",tarifa:0,experiencia:""}},
      montoCobrado: this.detalleFormGroup.get("monto")!.value,
      estado: (this.detalleFormGroup.get("estado")!.value)
    };

    this.asesoriaService.postAsesoria(nuevaAsesoria).subscribe({
      next:(data:Asesoria)=>{
        this.idAsesor=nuevaAsesoria.asesor.id;
        this._snackBar.open("La asignacion se grabó","OK",{duration: 1000});
        this.enrutador.navigate(["/list-asesoria"]);
      },
      error:(err) => {
        this._snackBar.open("ERROR","OK",{duration: 1000});
        console.log(err);
      }
    })

  }
  cargaCursos(){
    this.asesorCursoService.getAsesorCursoByAsesorId(this.idAsesor).subscribe({
      next:(data:AsesorCurso[])=>{
        //this.listCursos=data;
        this.listCursos =data.filter(asesorCurso=>asesorCurso.asesor.id===this.idAsesor)
        .map(asesorCurso=>asesorCurso.curso);
      },
      error: (err)=>{
        console.log(err);        
      }
    })
  }
  cargaAlumno(){
    this.alumnoService.getAllAlumnos().subscribe({
      next:(data:Alumno[])=>{
        this.listAlumno=data;
      },
      error: (err)=>{
        console.log(err);        
      }
    })
  }
  cargaAsesor(){
    this.asesorService.getAllAsesores().subscribe({
      next:(data:Asesor[])=>{
        this.listAsesor=data;
      },
      error: (err)=>{
        console.log(err);        
      }
    })
  }
  cargaHorario(){
    this.horarioService.getHorariosPorAsesorId(this.idAsesor).subscribe({
      next:(data:Horario[])=>{
        this.listHorario=data;
        // Obtener días únicos para usarlos como opciones en el select de horario
        this.dias = Array.from(new Set(data.map(horario => horario.dia)));

        // Inicialmente mostrar horarios del primer día
        if (this.dias.length > 0) {
        this.filtrarHorasPorDia(this.dias[0]); // Filtrar por el primer día
        }

        // Escuchar cambios en el select de horario para filtrar horas inicio y fin
        this.detalleFormGroup.get('horario')!.valueChanges.subscribe(selectedHorarioId => {
        const horarioSeleccionado = data.find(horario => horario.id === selectedHorarioId);
        if (horarioSeleccionado) {
          this.filtrarHorasPorDia(horarioSeleccionado.dia);
        }
      });
      //para que se muestre la hora fin de la hora inicio respectivamente
      this.detalleFormGroup.get('horaInicio')!.valueChanges.subscribe(selectedHoraInicio => {
        if (selectedHoraInicio) {
          // Filtrar la hora fin correspondiente a la hora inicio seleccionada
          const horarioSeleccionado = data.find(horario => horario.horaInicio === selectedHoraInicio);
          if (horarioSeleccionado) {
            this.horasFin = [horarioSeleccionado.horaFin];
          }
        }
      });
    },
    error: (err) => {
      console.log(err);
    }
  });
  }

  filtrarHorasPorDia(diaSeleccionado: string) {
    // Filtrar horas de inicio y fin por el día seleccionado
    const horariosDelDia = this.listHorario.filter(horario => horario.dia === diaSeleccionado);
    this.horasInicio = horariosDelDia.map(horario => horario.horaInicio);
    this.horasFin = horariosDelDia.map(horario => horario.horaFin);
  }
  
}
