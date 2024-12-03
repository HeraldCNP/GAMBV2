import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { DependenciasService } from 'src/app/modules/correspondencia/services/dependencias.service';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.css'
})
export class ShowUserComponent {
  private dependenciaService = inject(DependenciasService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ShowUserComponent>) {

  }


  dependencia: any;
  users: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  ngOnInit(): void {
    this.inputData = this.data;
    this.getDependencia();
  }

  getDependencia(){
    this.dependenciaService.getDependencia(this.inputData.idDependencia).subscribe((data) => {
      this.dependencia = data;
      this.users = this.dependencia.idUser;
      console.log(this.users);
    });
  }
}

