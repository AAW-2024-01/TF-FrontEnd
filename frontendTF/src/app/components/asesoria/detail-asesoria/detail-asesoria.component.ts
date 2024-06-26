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
  

  constructor (private asesoriaService: AsesoriaService, private formBuilder:FormBuilder,
               private enrutador: Router, private _snackBar: MatSnackBar, private ruta:ActivatedRoute,
            private cursoService: CursoService, private alumnoService: AlumnoService) {};


  ngOnInit(){
    this.cargaCursos();
    this.cargaAlumno();
    this.crearFormGrup();
  }

  crearFormGrup(){
    this.detalleFormGroup = this.formBuilder.group({
      id:[""],
      alumno:[""],
      curso:[""],
      monto:[""],
      estado:[""]      
    })
  }


  grabarAsesoria(){

    const nuevaAsesoria:Asesoria={
      id: parseInt(this.detalleFormGroup.get("id")!.value),
      alumno:{id: this.detalleFormGroup.get("alumno")!.value, ciclo:0,nombre:"",apellido:""},
      curso:{id: this.detalleFormGroup.get("curso")!.value, nombre:"", ciclo:0},
      montoCobrado: this.detalleFormGroup.get("monto")!.value,
      estado: (this.detalleFormGroup.get("estado")!.value)
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
    this.cursoService.getAllCursos().subscribe({
      next:(data:Curso[])=>{
        this.listCursos=data;
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

}
