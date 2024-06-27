import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanalContacto } from '../../../models/canal-contacto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanalContactoService } from '../../../services/canal-contacto.service';


@Component({
  selector: 'app-detail-canal-contacto',
  templateUrl: './detail-canal-contacto.component.html',
  styleUrl: './detail-canal-contacto.component.css'
})
export class DetailCanalContactoComponent {
  detalleFormGrup!: FormGroup;

  constructor(private serviceCanalContacto: CanalContactoService, private formBuilder: FormBuilder,
              private enrutador: Router, private snackbar: MatSnackBar){};

  ngOnInit(): void{
    this.crearForm();
  }
  crearForm(){
    this.detalleFormGrup=this.formBuilder.group({
      id:[""],
      telefono:[""],
      email:[""],
      linkedin:[""],
      url:[""],
    })
  }
  agregarCanalContacto(){
    const nuevoCanalContacto:CanalContacto={
      id: parseInt(this.detalleFormGrup.get("id")?.value),
      telefono: this.detalleFormGrup.get("telefono")?.value,
      email: this.detalleFormGrup.get("email")?.value,
      linkedin: this.detalleFormGrup.get("linkedin")?.value,
      url: this.detalleFormGrup.get("url")?.value
    }
    this.serviceCanalContacto.postCanalContacto(nuevoCanalContacto).subscribe({
          next:(data:CanalContacto)=>{
            this.snackbar.open("se creo correctamente","OK",{duration:1000});
            this.enrutador.navigate(["/list"]);
          },
          error(err) {
            console.log(err);
          },
    })
  }
}
