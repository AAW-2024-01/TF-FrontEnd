import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';

import { AlumnoService } from '../../../services/alumno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../../models/alumno';

@Component({
  selector: 'app-detail-alumno',
  templateUrl: './detail-alumno.component.html',
  styleUrl: './detail-alumno.component.css'
})
export class DetailAlumnoComponent {

  id:number=0;
  detalleFormGroup!:FormGroup;
  constructor(private userService:UserService, private formBuilder: FormBuilder, 
              private alumnoService:AlumnoService,private enrutador: Router,
              private _snackBar: MatSnackBar, private ruta:ActivatedRoute){}
  ngOnInit(): void {
      this.crearFormGrup();
      this.id = this.ruta.snapshot.params["id"];
      if (this.id!=0 && this.id!=undefined) {
      this.alumnoService.getAlumno(this.id).subscribe({
        next: (data:Alumno)=>{
          this.detalleFormGroup.get("id")?.setValue(data.id);
          this.detalleFormGroup.get("ciclo")?.setValue(data.ciclo);
          this.detalleFormGroup.get("nombre")?.setValue(data.nombre);
          this.detalleFormGroup.get("apellido")?.setValue(data.apellido);
      
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
      ciclo:[""],
      nombre:[""],
      apellido:[""]
    });
  }
  guardarAlumno(){
    const nuevoAlumno:Alumno={
      id: this.userService.getId()!,
      ciclo:this.detalleFormGroup.get("ciclo")!.value,     
      nombre: this.detalleFormGroup.get("nombre")!.value,
      apellido:this.detalleFormGroup.get("apellido")!.value,
     
    };
    this.alumnoService.postAlumno(nuevoAlumno).subscribe({
      next:(data:Alumno) => {
        console.log(data);
            this._snackBar.open("El curso se grabó","OK",{duration: 1000});
            this.enrutador.navigate(["/home"]);
        },
        error:(err) => {
        this._snackBar.open(err.error.message,"OK",{duration: 2000});        
        console.log(err);
      }
    });
  }
}
