import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { DependenciasService } from 'src/app/modules/correspondencia/services/dependencias.service';

@Component({
  selector: 'app-form-dependencia',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-dependencia.component.html',
  styleUrl: './form-dependencia.component.css'
})
export class FormDependenciaComponent {
  private fb = inject(FormBuilder);
  private dependenciaService = inject(DependenciasService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormDependenciaComponent>) {

  }


  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.id != 0){
      this.loadDependenciaForId(this.inputData.id);
    }
    // this.cargarTipos();
  }

  public dependenciaForm: FormGroup = this.fb.group({
    descripcion: ['', [Validators.required]],
    sigla: ['', [Validators.required, Validators.minLength(2)]],
    isActive : [true],
  })

  get form() {
    return this.dependenciaForm.controls;
  }

  loadDependenciaForId(id: any) {
    this.dependenciaService.getDependencia(id).subscribe(item => {
      this.editData = item;
      this.dependenciaForm.patchValue({
        descripcion: this.editData.descripcion,
        sigla: this.editData.sigla,
        isActive: this.editData.isActive,
      });
    })
  }

  toggleChanged(){
    this.dependenciaForm.value.isActive = !this.dependenciaForm.value.isActive;
  }


  // cargarTipos() {
  //   this.beneficiaryService.getAllTipos()
  //     .subscribe({
  //       next: (data: any) => {
  //         this.tipos.set(data);
  //         console.log(this.tipos());
  //       },
  //       error: (message: string | undefined) => {
  //         Swal.fire('Error', message, 'error')
  //       }
  //     })
  // }




  createDependencia() {
    this.dependenciaService.createDependencia(this.dependenciaForm.value).subscribe({
      next: (resp: any) => {
        this.closeDialog('created');
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  editDependencia(id:string){
    this.dependenciaService.editDependencia(this.dependenciaForm.value, id).subscribe({    
      next: (resp: any) => {
        this.closeDialog('edited');
        // console.log("resp",resp);
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }


}
