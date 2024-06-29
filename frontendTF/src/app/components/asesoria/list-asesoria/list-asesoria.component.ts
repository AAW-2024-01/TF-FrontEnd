import { Component } from '@angular/core';
import { Asesoria } from '../../../models/asesoria';
import { MatTableDataSource } from '@angular/material/table';
import { AsesoriaService } from '../../../services/asesoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../confirmacion/confirmacion.component';
import { Curso } from '../../../models/curso';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-asesoria',
  templateUrl: './list-asesoria.component.html',
  styleUrl: './list-asesoria.component.css'
})
export class ListAsesoriaComponent {
  dataSource=new MatTableDataSource<Asesoria>();
  displayedColumns:string[]=["id","nombre","curso","dia","horaInicio","horaFin","monto","estado","actions"];
  cantidad:number=0;
  prueba:string[]=[];
  horasFin:string[]=[];

  constructor (private asesoriaService: AsesoriaService, private _snackBar:MatSnackBar,
     private confirmador: MatDialog, private userService:UserService){}
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();   
  }

  ngOnInit(){
    this.cargarLista();
  }

  cargarLista() {
    if (this.userService.getAuthorities()?.includes('ROLE_TEACHER')) {
      // Modo teacher: cargar por Asesor ID
      this.asesoriaService.getAsesoriaByAsesorId(this.userService.getId()!).subscribe({
        next: (data: Asesoria[]) => {
          this.dataSource = new MatTableDataSource(data);
          this.cantidad = data.length;
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (this.userService.getAuthorities()?.includes('ROLE_STUDENT')) {
      // Modo student: cargar por Alumno ID
      this.asesoriaService.getAsesoriaByAlumnoId(this.userService.getId()!).subscribe({
        next: (data: Asesoria[]) => {
          this.dataSource = new MatTableDataSource(data);
          this.cantidad = data.length;
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log("No se encontraron roles válidos para cargar la lista.");
    }
  }

  eliminar(id: number){
    let respuestaDialog = this.confirmador.open(ConfirmacionComponent);  
    respuestaDialog.afterClosed().subscribe(result => {
      if (result) {
        this.asesoriaService.deleteAsesoria(id).subscribe({
          next: ()=>{
            this.cargarLista();
          },
          error:(err)=> {
            console.log(err);
            this._snackBar.open("La asignación de empleado al proyecto no se eliminó pues existen otros registros que dependen de este","OK",{duration: 2000});
            
          },
        });
      }    
    });
  }
  validarAutoridad():boolean{
    
    if(this.userService.getAuthorities()?.includes('ROLE_TEACHER')){
      return false;
    }
    return true;
  }

  isAsesor(): boolean {
    return this.userService.getAuthorities()?.includes('ROLE_TEACHER') ?? false;
  }
}
