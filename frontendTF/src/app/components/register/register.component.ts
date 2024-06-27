import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerFormGroup!: FormGroup;
  mostrarPassword:boolean=false;
  tipoUsuario:string="ROLE_TEACHER";
  idAsesor:number =0;
  constructor (private servicioUsuario: UserService, private formBuilder:FormBuilder,
            private enrutador: Router, private _snackBar: MatSnackBar) {}
  
  
   ngOnInit(){
    this.crearFormGrup();
   }
  
   crearFormGrup(){
    this.registerFormGroup = this.formBuilder.group({
      userName:["",[Validators.required, Validators.minLength(5)]],
      password:["",[Validators.required, Validators.minLength(5)]]
    })
   }
  
   registrarUsuario(){
    const usuario:User={
      id:0,
      userName: this.registerFormGroup.get("userName")!.value,
      password: this.registerFormGroup.get("password")!.value,
      type: this.tipoUsuario    
    }
  
    this.servicioUsuario.registrarUsuario(usuario).subscribe({
      next:(data) => {
  
        this.enrutador.navigate(["/"]);
        this._snackBar.open("El usuario se registró correctamente","OK",{duration: 2000});
        this.idAsesor =data.id;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);      
        this._snackBar.open("El usuario no pudo ser registrado: "+err.error.message,"OK",{duration: 3000});
       
      }
    })  
   }
  
}
