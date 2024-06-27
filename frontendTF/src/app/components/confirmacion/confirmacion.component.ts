import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>) {}

  cancelar(){
    this.dialogRef.close(false);
  }
  confirmar(){
    this.dialogRef.close(true);
  }
}
