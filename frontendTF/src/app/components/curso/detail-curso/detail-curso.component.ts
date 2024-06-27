import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from '../../../models/curso';
import { AsesorService } from '../../../services/asesor.service';
import { Asesor } from '../../../models/asesor';

@Component({
  selector: 'app-detail-curso',
  templateUrl: './detail-curso.component.html',
  styleUrl: './detail-curso.component.css'
})
export class DetailCursoComponent {
  detalleFormGroup!:FormGroup;
  id:number=0;
  listAsesor:Asesor[]=[];

  constructor (private servicioCurso: CursoService, private formBuilder:FormBuilder,
               private enrutador: Router, private _snackBar: MatSnackBar, 
               private ruta:ActivatedRoute,private asesorService:AsesorService) {};
  
  ngOnInit(){
    this.cargaAsesor();
    this.crearFormGrup();
    this.id = this.ruta.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.servicioCurso.getCurso(this.id).subscribe({
        next: (data:Curso)=>{
          this.detalleFormGroup.get("id")?.setValue(data.id);
          this.detalleFormGroup.get("nombre")?.setValue(data.nombre);
          this.detalleFormGroup.get("ciclo")?.setValue(data.ciclo);
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
      nombre:["",[Validators.required,Validators.minLength(5)]],
      ciclo:["",[Validators.required]],
      asesor:[""]
    });
  }

  grabarCurso(){
    const nuevoCurso:Curso={
      id: parseInt(this.detalleFormGroup.get("id")!.value),
      nombre: this.detalleFormGroup.get("nombre")!.value,
      ciclo: parseFloat(this.detalleFormGroup.get("ciclo")!.value),
    };
    this.servicioCurso.postCurso(nuevoCurso).subscribe({
      next:(data:Curso) => {
        console.log(data);

            this._snackBar.open("El curso se grabó","OK",{duration: 1000});
            this.enrutador.navigate(["/list-curso"]);
        },
        error:(err) => {
        this._snackBar.open(err.error.message,"OK",{duration: 2000});        
        console.log(err);

      }
    });
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
