import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { TiposService } from 'src/app/modules/correspondencia/services/tipos.service';

@Component({
  selector: 'app-form-tipo',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-tipo.component.html',
  styleUrl: './form-tipo.component.css'
})
export class FormTipoComponent {

  private fb = inject(FormBuilder);
  private tipoService = inject(TiposService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormTipoComponent>) {

  }


  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  ngOnInit(): void {
    this.inputData = this.data;
    // console.log(this.inputData);
    
    if(this.inputData.id != 0){
      this.loadTipoForId(this.inputData.id);
    }
    // this.cargarTipos();
  }

  public tipoForm: FormGroup = this.fb.group({
    nombreTipo: ['', [Validators.required]],
    siglaTipo: ['', [Validators.required, Validators.minLength(2)]],
  })

  get form() {
    return this.tipoForm.controls;
  }

  loadTipoForId(id: any) {
    this.tipoService.getTipo(id).subscribe(item => {
      this.editData = item;
      this.tipoForm.patchValue({
        nombreTipo: this.editData.nombreTipo,
        siglaTipo: this.editData.siglaTipo,
      });
    })
  }



  toggleChanged(){
    this.tipoForm.value.isActive = !this.tipoForm.value.isActive;
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




  createTipo() {
    this.tipoService.createTipo(this.tipoForm.value).subscribe({
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

  editTipo(id:string){
    this.tipoService.editTipo(this.tipoForm.value, id).subscribe({    
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
