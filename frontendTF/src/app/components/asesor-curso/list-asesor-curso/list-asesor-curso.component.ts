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
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-asesor-curso',
  templateUrl: './list-asesor-curso.component.html',
  styleUrl: './list-asesor-curso.component.css'
})
export class ListAsesorCursoComponent {
  displayedColumns:string[]=["id","nombre","ciclo","carrera","acciones"];
  dataSource!: MatTableDataSource<AsesorCurso>;
  id:number=0;
  listCarrera:string[]=[];
  detalleFormGroup!:FormGroup;
  constructor(private cursoService:CursoService,private _snackBar:MatSnackBar, private formBuilder:FormBuilder,
              private confirmador: MatDialog, private asesorService:AsesorService,
              private asesorCursoService:AsesorCursoService, private userService:UserService){}

  ngOnInit(): void {
    this.id = this.userService.getId()!;
    this.cargaAsesorCurso();
    this.crearForm();
    
  }
  crearForm(){
    this.detalleFormGroup = this.formBuilder.group({
      carre:[""],
    });    
  }
  cargaAsesorCurso(){
    this.asesorCursoService.getAsesorCursoByAsesorId(this.id).subscribe({
      next:(data:AsesorCurso[])=>{
        this.dataSource = new MatTableDataSource(data);
        this.listCarrera = Array.from(new Set(data.map(x => x.carrera)));
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
        this.asesorCursoService.deleteAsesorCurso(id).subscribe({
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
  filterCarrera(event:any){
    const selectedCarrera = event.value;
    this.asesorCursoService.getAsesorCursoByCarrera(selectedCarrera.toString()).subscribe({
      next:(data:AsesorCurso[])=>{
        const filteredData = data.filter(asesorCurso => asesorCurso.asesor.id === this.id);
        this.dataSource = new MatTableDataSource(filteredData);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  listarTodosLosCursos(){
    this.asesorCursoService.getAsesorCursoByAsesorId(this.userService.getId()!).subscribe({
      next:(data:AsesorCurso[])=>{
        this.dataSource = new MatTableDataSource(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
