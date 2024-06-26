import { Component } from '@angular/core';
import { ConfirmacionComponent } from '../../confirmacion/confirmacion.component';
import { Curso } from '../../../models/curso';
import { MatTableDataSource } from '@angular/material/table';
import { CursoService } from '../../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AsesorService } from '../../../services/asesor.service';
import { AsesorCursoService } from '../../../services/asesor-curso.service';
import { AsesorCurso } from '../../../models/asesor-curso';
import { Asesor } from '../../../models/asesor';

@Component({
  selector: 'app-list-asesor-curso',
  templateUrl: './list-asesor-curso.component.html',
  styleUrl: './list-asesor-curso.component.css'
})
export class ListAsesorCursoComponent {
  displayedColumns:string[]=["id","nombre","ciclo","asesor","acciones"];
  dataSource!: MatTableDataSource<AsesorCurso>;
  listCursos:Curso[]=[];
  constructor(private cursoService:CursoService,private _snackBar:MatSnackBar, 
              private confirmador: MatDialog, private asesorService:AsesorService,
              private asesesorCursoService:AsesorCursoService){}

  applyFilter(evento:Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.cargaAsesorCurso();
    
  }
  cargaAsesorCurso(){
    this.asesesorCursoService.getAllAsesorCurso().subscribe({
      next:(data:AsesorCurso[])=>{
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
