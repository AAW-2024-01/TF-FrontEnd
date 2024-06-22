import { Component } from '@angular/core';
import { Curso } from '../../../models/curso';
import { MatTableDataSource } from '@angular/material/table';
import { CursoService } from '../../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../confirmacion/confirmacion.component';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrl: './list-curso.component.css'
})
export class ListCursoComponent {
  displayedColumns:string[]=["id","nombre","ciclo","acciones"];
  dataSource!: MatTableDataSource<Curso>;

  constructor(private cursoService:CursoService,private _snackBar:MatSnackBar, private confirmador: MatDialog){}

  applyFilter(evento:Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.cargaAlumnos();
    
  }
  cargaAlumnos(){
    this.cursoService.getAllCursos().subscribe({
      next:(data:Curso[])=>{
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
        this.cursoService.deleteCurso(id).subscribe({
          next: ()=>{
            this.cargaAlumnos();
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
