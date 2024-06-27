import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoCurso } from '../../models/alumno-curso';
import { CursoService } from '../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoCursoService } from '../../services/alumno-curso.service';
import { UserService } from '../../services/user.service';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-alumno-curso',
  templateUrl: './alumno-curso.component.html',
  styleUrl: './alumno-curso.component.css'
})
export class AlumnoCursoComponent {
  displayedColumns:string[]=["id","nombre","ciclo","nivelDominio","acciones"];
  dataSource!: MatTableDataSource<AlumnoCurso>;
  id:number=0;

  constructor(private cursoService:CursoService,private _snackBar:MatSnackBar, 
              private confirmador: MatDialog, private alumnoService:AlumnoService,
              private alumnoCursoService:AlumnoCursoService, private userService:UserService){}

  applyFilter(evento:Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.id = this.userService.getId()!;
    this.cargaAsesorCurso();
    
  }
  cargaAsesorCurso(){
    this.alumnoCursoService.getAlumnoCursoByAlumnoId(this.id).subscribe({
      next:(data:AlumnoCurso[])=>{
        this.dataSource = new MatTableDataSource(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  eliminar(id: number){
    let respuestaDialog = this.confirmador.open(ConfirmacionComponent);  
    respuestaDialog.afterClosed().subscribe(result => {
      if (result) {
        this.alumnoCursoService.deleteAlumnoCurso(id).subscribe({
          next: ()=>{
            this.cargaAsesorCurso();
          },
          error:(err)=> {
            console.log(err);
            this._snackBar.open("El curso no se eliminó pues existen otros registros que dependen de este","OK",{duration: 2000});
          },
        });
      }    
    });
  }
}
