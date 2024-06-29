import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Horario } from '../../../models/horario';
import { HorarioService } from '../../../services/horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asesor } from '../../../models/asesor';
import { AsesorService } from '../../../services/asesor.service';
import { UserService } from '../../../services/user.service';
import { DetalleHorarioService } from '../../../services/detalle-horario.service';
import { DetalleHorario } from '../../../models/detalle-horario';
import { Curso } from '../../../models/curso';
import { Asesoria } from '../../../models/asesoria';

@Component({
  selector: 'app-detail-horario',
  templateUrl: './detail-horario.component.html',
  styleUrl: './detail-horario.component.css'
})
export class DetailHorarioComponent {
  detalleFormGroup!:FormGroup;
  id:number=0;
  listAsesor:Asesor[]=[];
  asesoria!:Asesoria;

  constructor (private servicioHorario: HorarioService, private formBuilder:FormBuilder,
               private enrutador: Router, private _snackBar: MatSnackBar, 
               private ruta:ActivatedRoute, private asesorService:AsesorService, 
               private userService: UserService, private detalleHorarioService:DetalleHorarioService) {};
  
  ngOnInit(){
    this.cargaAsesor();
    this.crearFormGrup();
    this.id = this.ruta.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.detalleHorarioService.getHorario(this.id).subscribe({
        next: (data:DetalleHorario)=>{
          this.detalleFormGroup.get("id")?.setValue(data.id);
          this.detalleFormGroup.get("dia")?.setValue(data.horario.dia);
          this.detalleFormGroup.get("horaInicio")?.setValue(data.horaInicio);
          this.detalleFormGroup.get("horaFin")?.setValue(data.horaFin);
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
      dia:["",[Validators.required,Validators.minLength(5)]],
      horaInicio:[""],
      horaFin:[""],
      asesor:[""]
    });
  }

  grabarHorario(){
    const nuevoHI = this.detalleFormGroup.get("horaInicio")!.value;
    const nuevoHF = this.detalleFormGroup.get("horaFin")!.value;
    const nuevoDia = this.detalleFormGroup.get("dia")!.value;

    if(nuevoDia){
      const nuevoHorario:Horario = {
        id:0,
        dia:this.detalleFormGroup.get("dia")!.value,
        asesor:{id:this.userService.getId()!, nombre:"",apellido:"",tarifa:0,experiencia:""},
      }
    
      this.servicioHorario.postHorario(nuevoHorario).subscribe({
        next:(data:Horario)=>{
          const nuevoDetalleHorario:DetalleHorario={
            id: parseInt(this.detalleFormGroup.get("id")!.value),
            horario:data,
            horaInicio:this.detalleFormGroup.get("horaInicio")!.value,
            horaFin:this.detalleFormGroup.get("horaFin")!.value}

            this.detalleHorarioService.postHorario(nuevoDetalleHorario).subscribe({
            next:()=>{
              console.log(data);
              this._snackBar.open("El horario se grabó","OK",{duration: 1000});
              this.enrutador.navigate(["/list-horario"]);
            },
            error:(err)=>{
              this._snackBar.open(err.error.message,"OK",{duration: 2000});        
              console.log(err);
            }
          })
        },
        error:(err)=>{
          this._snackBar.open(err.error.message, "OK", { duration: 2000 });
          console.log(err);
        }
      })
    }else{
      this._snackBar.open("Complete los datos del horario", "OK", { duration: 2000 });
    }
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
