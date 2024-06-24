import { Component } from '@angular/core';
import { Asesoria } from '../../../models/asesoria';
import { MatTableDataSource } from '@angular/material/table';
import { AsesoriaService } from '../../../services/asesoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../confirmacion/confirmacion.component';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-list-asesoria',
  templateUrl: './list-asesoria.component.html',
  styleUrl: './list-asesoria.component.css'
})
export class ListAsesoriaComponent {
  dataSource=new MatTableDataSource<Asesoria>();
  displayedColumns:string[]=["id","alumno","curso","horaInicio","horaFin","monto","estado","actions"];
  cantidad:number=0;
  curso:Curso[]=[];

  constructor (private asesoriaService: AsesoriaService, private _snackBar:MatSnackBar, private confirmador: MatDialog){}
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();   
  }

  ngOnInit(){
    this.cargarLista();
  }

  cargarLista(){
    this.asesoriaService.getAllAsesorias().subscribe({
      next: (data:Asesoria[]) => {
        this.dataSource = new MatTableDataSource(data); 
        this.cantidad = data.length;  
      },
      error: (err) => {
        console.log(err);
      }
    });
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
}
