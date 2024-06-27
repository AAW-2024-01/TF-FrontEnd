import { Component } from '@angular/core';
import { Curso } from '../../../models/curso';
import { Asesor } from '../../../models/asesor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsesorCursoService } from '../../../services/asesor-curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AsesorService } from '../../../services/asesor.service';
import { CursoService } from '../../../services/curso.service';
import { AsesorCurso } from '../../../models/asesor-curso';

@Component({
  selector: 'app-detail-asesor-curso',
  templateUrl: './detail-asesor-curso.component.html',
  styleUrl: './detail-asesor-curso.component.css'
})
export class DetailAsesorCursoComponent {

  detalleFormGroup!:FormGroup;
  id:number=0;
  listCursos:Curso[]=[];
  listAsesor:Asesor[]=[];
  asesorId:number=0;
  

  constructor (private asesorCursoService: AsesorCursoService, private formBuilder:FormBuilder,
               private enrutador: Router, private _snackBar: MatSnackBar, private ruta:ActivatedRoute,
            private cursoService: CursoService,private asesorService: AsesorService) {};


  ngOnInit(){
    //sacar del local storage para que se agregue los cursos solo en ese asesor
    //this.asesorId = this.authService.getAsesorId();
    this.cargaCursos();
    this.cargaAsesor();
    this.crearFormGrup();
  }

  crearFormGrup(){
    this.detalleFormGroup = this.formBuilder.group({
      id:[""],
      nivelDominio:[""],
      asesor:[""],
      curso:[""], 
      nombre:[""],
      ciclo:[""]  
    });    
  }

  grabarAsesorCurso(){

    const cursoExistenteId = this.detalleFormGroup.get("curso")!.value;
    const nombreNuevoCurso = this.detalleFormGroup.get("nombre")!.value;
    const cicloNuevoCurso = this.detalleFormGroup.get("ciclo")!.value;

    if(cursoExistenteId){
      const nuevoAsesorCurso:AsesorCurso={
        id: parseInt(this.detalleFormGroup.get("id")!.value),
        nivelDominio:parseInt(this.detalleFormGroup.get("nivelDominio")!.value),
        //asesor: { id: this.asesorId, nombre: "", apellido: "", tarifa: 0, experiencia: "" },
        asesor:{id:this.detalleFormGroup.get("asesor")!.value, nombre:"",apellido:"",tarifa:0,experiencia:""},
        curso:{id: this.detalleFormGroup.get("curso")!.value, nombre:"", ciclo:0},
      };    

      this.asesorCursoService.postAsesorCurso(nuevoAsesorCurso).subscribe({
      next:(data:AsesorCurso)=>{
        this._snackBar.open("La asignacion se grabó","OK",{duration: 1000});
        this.enrutador.navigate(["/list-asesor-curso"]);
      },
      error:(err) => {
        this._snackBar.open("ERROR","OK",{duration: 1000});
        console.log(err);
      }
    });
    } else if(nombreNuevoCurso && cicloNuevoCurso){
      const nuevoCurso: Curso = {
        id: 0,  // Se asume que el backend asignará un ID
        nombre: nombreNuevoCurso,
        ciclo: cicloNuevoCurso
      };
      this.cursoService.postCurso(nuevoCurso).subscribe({
        next:(data:Curso) => {
          const nuevoAsesorCurso:AsesorCurso = { 
              id: parseInt(this.detalleFormGroup.get("id")!.value),
              nivelDominio: parseInt(this.detalleFormGroup.get("nivelDominio")!.value),
              asesor: { id: this.detalleFormGroup.get("asesor")!.value, nombre: "", apellido: "", tarifa: 0, experiencia: "" },
              curso: data
          };
          this.asesorCursoService.postAsesorCurso(nuevoAsesorCurso).subscribe({
            next:(data:AsesorCurso)=>{
              this._snackBar.open("El curso se grabó","OK",{duration: 1000});
              this.enrutador.navigate(["/list-asesor-curso"]);
            },
            error:(err) => {
              this._snackBar.open(err.error.message,"OK",{duration: 2000});        
              console.log(err);
            }
          });
        },
        error: (err) => {
          this._snackBar.open(err.error.message, "OK", { duration: 2000 });
          console.log(err);
          }
        });
      }else{
        this._snackBar.open("Seleccione un curso existente o complete los datos del nuevo curso", "OK", { duration: 2000 });
      }
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
}

