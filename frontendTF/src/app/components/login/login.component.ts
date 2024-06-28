import { Component ,inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoUsuarioService } from '../../tipo-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  mostrarPassword:boolean=false;
  idAsesor:number=0;

  constructor (private servicioUsuario: UserService, private formBuilder:FormBuilder,
    private enrutador: Router, private _snackBar: MatSnackBar ,public nameTipo:TipoUsuarioService) {}
  

    ngOnInit(){
      this.crearFormGrup();
     }

    
     crearFormGrup(){
      this.loginFormGroup = this.formBuilder.group({
        userName:["",[Validators.required, Validators.minLength(5)]],
        password:["",[Validators.required, Validators.minLength(5)]]
      })
     }

     logearUsuario(){
      const usuario:User={
        id:0,
        userName: this.loginFormGroup.get("userName")!.value,
        password: this.loginFormGroup.get("password")!.value,
        type: ""    
      }
      this.servicioUsuario.logearUsuario(usuario).subscribe({
        next: (data)=>{
          switch(this.nameTipo.getTipo().toString())
          {
            case'Alumno':
            console.log("Alumno");
            break;
            case'Asesor':
            this.enrutador.navigate(["/home"]);
            break;     
          }
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this._snackBar.open("Error en el ingreso: "+err.error.message,"OK", {duration:3000});
        }
      })
     }
}
