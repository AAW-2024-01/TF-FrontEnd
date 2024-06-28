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
  listDetalleHorario:DetalleHorario[]=[];
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
            private asesorCursoService: AsesorCursoService, private userService:UserService,
            private detalleHorarioService:DetalleHorarioService) {};

  ngOnInit(){
    this.idAsesor = this.userService.getId()!;
    this.crearFormGrup();
    this.cargaCursos();
    this.cargaAlumno();
    this.cargaAsesor();
    this.cargaHorario();
    this.id = this.ruta.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.asesoriaService.getAsesoria(this.id).subscribe({
        next: (data:Asesoria)=>{
          this.detalleFormGroup.get("id")?.setValue(data.id);
          this.detalleFormGroup.get("alumno")!.setValue(data.alumno.id);
          this.detalleFormGroup.get("asesor")!.setValue(data.asesor.id);
          this.detalleFormGroup.get("curso")!.setValue(data.curso.id);
          this.detalleFormGroup.get("monto")!.setValue(data.montoCobrado);
          this.detalleFormGroup.get("estado")!.setValue(data.estado);
          this.detalleFormGroup.get("horario")!.setValue(data.detalle.id);
          this.detalleFormGroup.get("horaInicio")?.setValue(data.detalle.horaInicio);
          this.detalleFormGroup.get("horaFin")?.setValue(data.detalle.horaFin);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    } else {
      this.id=0;
    }
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
     
    this.detalleFormGroup.get("horario")!.valueChanges.subscribe(selectedHorarioId => {
      const selectedHorario = this.listDetalleHorario.find(h => h.horario.id === selectedHorarioId);
      if (selectedHorario) {
        this.filtrarHorasPorDia(selectedHorario.horario.dia);
        this.detalleFormGroup.get("horaInicio")?.setValue(selectedHorario.horaInicio);
        this.detalleFormGroup.get("horaFin")?.setValue(selectedHorario.horaFin);
      }
    });
  }
  grabarAsesoria(){
    const nuevaAsesoria:Asesoria={
      id: parseInt(this.detalleFormGroup.get("id")!.value),
      alumno:{id: this.detalleFormGroup.get("alumno")!.value, ciclo:0,nombre:"",apellido:""},
      asesor:{id:this.detalleFormGroup.get("asesor")!.value, nombre:"",apellido:"",tarifa:0,experiencia:""},
      curso:{id: this.detalleFormGroup.get("curso")!.value, nombre:"", ciclo:0},
      //horario:{id: this.detalleFormGroup.get("horario")!.value, dia:"",asesor:{id: this.idAsesor, nombre:"",apellido:"",tarifa:0,experiencia:""}},
      montoCobrado: this.detalleFormGroup.get("monto")!.value,
      estado: this.detalleFormGroup.get("estado")!.value,
      detalle:{id:this.detalleFormGroup.get("horario")!.value, horaInicio:"",horaFin:"",horario:{id:this.detalleFormGroup.get("horario")!.value,dia:"",asesor:{id:this.detalleFormGroup.get("asesor")!.value, nombre:"",apellido:"",tarifa:0,experiencia:""}}}
    };
    
    this.asesoriaService.postAsesoria(nuevaAsesoria).subscribe({
      next:(data:Asesoria)=>{
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
    this.detalleHorarioService.getDetalleHorariosPorAsesorId(this.idAsesor).subscribe({
      next:(data:DetalleHorario[])=>{
        this.listDetalleHorario=data;
        this.listHorario=data.map(x=>x.horario);
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
    const horariosDelDia = this.listDetalleHorario.filter(horario => horario.horario.dia === diaSeleccionado);
    this.horasInicio = horariosDelDia.map(horario => horario.horaInicio);
    this.horasFin = horariosDelDia.map(horario => horario.horaFin);
  
  }
  validarAutoridad():boolean{
    if(this.userService.getAuthorities()! === "ROLE_TEACHER"){
      return true;
    }
    return false;
  }
  
}
