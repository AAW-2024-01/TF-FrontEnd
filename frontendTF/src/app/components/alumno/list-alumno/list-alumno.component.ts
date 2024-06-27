import { Component } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-list-alumno',
  templateUrl: './list-alumno.component.html',
  styleUrl: './list-alumno.component.css'
})
export class ListAlumnoComponent {

  displayedColumns:string[]=["id","ciclo","nombre","apellido"];
  dataSource!: MatTableDataSource<Alumno>;

  constructor(private alumnoService:AlumnoService){}
  ngOnInit(): void {
    this.cargaAlumnos();
    
  }
  cargaAlumnos(){
    this.alumnoService.getAllAlumnos().subscribe({
      next:(data:Alumno[])=>{
        this.dataSource = new MatTableDataSource(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  applyFilter(evento:Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
