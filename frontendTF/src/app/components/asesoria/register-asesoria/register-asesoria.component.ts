import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetalleHorario } from '../../../models/detalle-horario';
import { DetalleHorarioService } from '../../../services/detalle-horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsesorService } from '../../../services/asesor.service';
import { UserService } from '../../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Asesoria } from '../../../models/asesoria';
import { CrearAsesoriaService } from '../../../crear-asesoria.service';
import { AsesoriaService } from '../../../services/asesoria.service';

interface Estado {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register-asesoria',
  templateUrl: './register-asesoria.component.html',
  styleUrl: './register-asesoria.component.css'
})
export class RegisterAsesoriaComponent {
  detalleFormGroup!:FormGroup;
  idAsesor:number=0;
  estados: Estado[] = [
    {value: 'RESERVADA', viewValue: 'RESERVADA'},
    {value: 'REALIZADA', viewValue: 'REALIZADA'},
    {value: 'CANCELADA', viewValue: 'CANCELADA'},
  ];
  listDetalleHorario:DetalleHorario[]=[];
  isSubmitting = false;

  constructor (private formBuilder:FormBuilder,
    private enrutador: Router, private _snackBar: MatSnackBar, 
    private ruta:ActivatedRoute, private asesorService:AsesorService, 
    private userService: UserService, private detalleHorarioService:DetalleHorarioService,
    private asesoriaService:AsesoriaService, public crearAsesoriaService:CrearAsesoriaService) {};


  
  ngOnInit(): void {
    this.cargaHorario();
    this.crearFormGrup();
  }
  crearFormGrup(){
    this.detalleFormGroup = this.formBuilder.group({
      estado:[""],
      horario:[""]
    });
  }

  cargaHorario(){
    this.detalleHorarioService.getDetalleHorariosPorAsesorId(parseInt(this.ruta.snapshot.params["id"])).subscribe({
      next:(data:DetalleHorario[])=>{
        this.listDetalleHorario=data;
        //this.listHorario=data.map(x=>x.horario);
    },
    error: (err) => {
      console.log(err);
    }
  });
  }

  agregarAsesoria(){
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    const nuevaAsesoria:Asesoria ={
      id:0,
      alumno:{id:1,nombre:"",apellido:"",ciclo:0},
      asesor:{id:this.ruta.snapshot.params["id"],nombre:"",apellido:"",tarifa:0,experiencia:""},
      curso:{id:this.crearAsesoriaService.getCurso().valueOf(),nombre:"",ciclo:0},
      detalle:{id:this.detalleFormGroup.get("horario")?.value,horario:{id:0,dia:"",asesor:{id:this.ruta.snapshot.params["id"],nombre:"",apellido:"",tarifa:0,experiencia:""}},horaFin:"",horaInicio:""},
      montoCobrado:0,
      estado: this.detalleFormGroup.get("estado")!.value
  }
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
}
