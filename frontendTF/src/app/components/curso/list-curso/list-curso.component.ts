import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrl: './list-curso.component.css'
})
export class ListCursoComponent {
  dataSource!: MatTableDataSource<Curso>
  displayedColumns: string[]=["id","nombre","ciclo"];
  cantidadRegistros: number=0;
  constructor(private serviceCurso:CursoService){};

  ngOnInit(): void{
    this.cargarLista();
  }
  cargarLista(){
    this.serviceCurso.getAllCursos().subscribe({
      next: (data: Curso[])=>{
        this.dataSource = new MatTableDataSource(data);
        this.cantidadRegistros = data.length;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  filtrar(evento: Event){
    const filterValue =(evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.cantidadRegistros = this.dataSource.filteredData.length;
  }
}
