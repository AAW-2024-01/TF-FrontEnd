import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFormGroup!: FormGroup;
  mostrarPassword:boolean=false;


  constructor (private servicioUsuario: UserService, private formBuilder:FormBuilder,
    private enrutador: Router, private _snackBar: MatSnackBar) {}
  

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
          this.enrutador.navigate(["/home"]);                    
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this._snackBar.open("Error en el ingreso: "+err.error.message,"OK", {duration:3000});
        }
      })
     }
}
