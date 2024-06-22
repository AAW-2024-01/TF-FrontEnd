import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-detail-curso',
  templateUrl: './detail-curso.component.html',
  styleUrl: './detail-curso.component.css'
})
export class DetailCursoComponent {
  detalleFormGroup!: FormGroup;

  constructor(private serviceCurso: CursoService, private formBuilder: FormBuilder,
              private enrutador: Router, private snackbar: MatSnackBar){};
  
 ngOnInit(): void{
  this.crearForm();
  }
  crearForm(){
    this.detalleFormGroup = this.formBuilder.group({
      id:[""],
      nombre:[""],
      ciclo:[""],
    })
  }
  agregarCurso(){
    const nuevoCurso:Curso={
      id: parseInt(this.detalleFormGroup.get("id")?.value),
      nombre: this.detalleFormGroup.get("nombre")?.value,
      ciclo: parseInt(this.detalleFormGroup.get("ciclo")?.value)
    }
    this.serviceCurso.postCurso(nuevoCurso).subscribe({
        next:(data:Curso)=>{
          this.snackbar.open("se creo correctamente","OK",{duration:1000})
          this.enrutador.navigate(["/list"]);
        },
        error:(err)=>{
          console.log(err);
        }
    })
  }
}
