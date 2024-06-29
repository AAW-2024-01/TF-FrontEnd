import { Component } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { Asesor } from '../../../models/asesor';

@Component({
  selector: 'app-list-asesor',
  templateUrl: './list-asesor.component.html',
  styleUrl: './list-asesor.component.css'
})
export class ListAsesorComponent {
  dataSource!:MatTableDataSource<Asesor>;
  displayedColumns:string[]=[];
  applyFilter(event:any){
  }
  eliminar(id:number){

  }
}
