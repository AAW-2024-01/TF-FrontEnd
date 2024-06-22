import { Component } from '@angular/core';
import { Horario } from '../../../models/horario';
import { MatTableDataSource } from '@angular/material/table';
import { HorarioService } from '../../../services/horario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../confirmacion/confirmacion.component';

@Component({
  selector: 'app-list-horario',
  templateUrl: './list-horario.component.html',
  styleUrl: './list-horario.component.css'
})
export class ListHorarioComponent {
  displayedColumns:string[]=["id","dia","horaInicio","horaFin","acciones"];
  dataSource!: MatTableDataSource<Horario>;

  constructor(private horarioService:HorarioService,private _snackBar:MatSnackBar, private confirmador: MatDialog){}

  applyFilter(evento:Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.cargaHorarios();
    
  }
  cargaHorarios(){
    this.horarioService.getAllHorarios().subscribe({
      next:(data:Horario[])=>{
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
        this.horarioService.deleteHorario(id).subscribe({
          next: ()=>{
            this.cargaHorarios();
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
