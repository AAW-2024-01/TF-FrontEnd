import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Asesor } from '../../../models/asesor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsesorService } from '../../../services/asesor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CambiosdeIdService } from '../../../cambiosde-id.service';

@Component({
  selector: 'app-detail-asesor',
  templateUrl: './detail-asesor.component.html',
  styleUrl: './detail-asesor.component.css'
})
export class DetailAsesorComponent {

  id:number=0;
  detalleFormGroup!:FormGroup;
  constructor(private userService:UserService, private formBuilder: FormBuilder, 
              private asesorService:AsesorService,private enrutador: Router,
              private _snackBar: MatSnackBar, private ruta:ActivatedRoute,public cambioIdService:CambiosdeIdService){}
  ngOnInit(): void {
      this.crearFormGrup();
      this.id = this.ruta.snapshot.params["id"];
      if (this.id!=0 && this.id!=undefined) {
      this.asesorService.getAsesor(this.id).subscribe({
        next: (data:Asesor)=>{
          this.detalleFormGroup.get("id")?.setValue(data.id);
          this.detalleFormGroup.get("nombre")?.setValue(data.nombre);
          this.detalleFormGroup.get("apellido")?.setValue(data.apellido);
          this.detalleFormGroup.get("tarifa")?.setValue(data.tarifa);
          this.detalleFormGroup.get("experiencia")?.setValue(data.experiencia);
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
      nombre:[""],
      apellido:[""],
      tarifa:[""],
      experiencia:[""],
    });
  }
  guardarAsesor(){
    const nuevoAsesor:Asesor={
      id: 0,
      nombre: this.detalleFormGroup.get("nombre")!.value,
      apellido:this.detalleFormGroup.get("apellido")!.value,
      tarifa:this.detalleFormGroup.get("tarifa")!.value,
     experiencia:this.detalleFormGroup.get("experiencia")!.value
    };
    this.asesorService.postAsesor(nuevoAsesor).subscribe({
      next:(data:Asesor) => {
            this._snackBar.open("grabado correctamente","OK",{duration: 1000});
            this.enrutador.navigate(["/home"]);
            
            console.log(data.id)
        },
        error:(err) => {
        this._snackBar.open(err.error.message,"OK",{duration: 2000});        
        console.log(err);
      }
    });
  }
}
