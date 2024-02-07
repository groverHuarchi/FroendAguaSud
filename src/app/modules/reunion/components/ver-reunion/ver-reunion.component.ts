import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-reunion',
  templateUrl: './ver-reunion.component.html',
  styleUrls: ['./ver-reunion.component.css']
})
export class VerReunionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private dialogRef: MatDialogRef<VerReunionComponent>,
  ) { }

  ngOnInit(): void {

    console.log(this.data)
  }

  volver(): void {
    // Cierra el modal al llamar a close en MatDialogRef
    this.dialogRef.close();
  }

}
export interface ReunionElement {
  idReunion:      number;
  mesAnhoReunion: string;
  descripcion:    string;
  estado:         boolean;
}