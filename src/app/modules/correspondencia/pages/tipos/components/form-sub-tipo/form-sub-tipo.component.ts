import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { TiposService } from 'src/app/modules/correspondencia/services/tipos.service';

@Component({
  selector: 'app-form-sub-tipo',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-sub-tipo.component.html',
  styleUrl: './form-sub-tipo.component.css'
})
export class FormSubTipoComponent {

  private fb = inject(FormBuilder);
  private tipoService = inject(TiposService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormSubTipoComponent>) {

  }


  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  ngOnInit(): void {
    this.inputData = this.data;
    console.log('datos', this.inputData);

    if (this.inputData.idSubTipo != null) {
      this.loadSubtipoForId(this.inputData.idTipo);
    }

  }

  public subtipoForm: FormGroup = this.fb.group({
    nombreSubTipo: ['', [Validators.required]],
    siglaSubTipo: [''],
  })


  get form() {
    return this.subtipoForm.controls;
  }

  loadSubtipoForId(id: any) {
    this.tipoService.getTipo(id).subscribe(item => {
      console.log(item.idSubTipos);
      console.log(this.inputData.idSubTipo);
      for (const obj of item.idSubTipos) {
        if (obj._id === this.inputData.idSubTipo) {
          this.editData = obj;
          break;
        }
      }

      console.log(this.editData);

      this.subtipoForm.patchValue({
        nombreSubTipo: this.editData.nombreSubTipo,
        siglaSubTipo: this.editData.siglaSubTipo,
      });
    })
  }



  toggleChanged() {
    this.subtipoForm.value.isActive = !this.subtipoForm.value.isActive;
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




  createSubtipo() {
    this.tipoService.createSubtipo(this.subtipoForm.value, this.inputData.idTipo).subscribe({
      next: (resp: any) => {
        this.closeDialog('created');
      },
      error: (resp: any) => {
        console.log(resp);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  editSubtipo(idSubTipo: string) {
    this.tipoService.editSubtipo(this.subtipoForm.value, idSubTipo).subscribe({
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
