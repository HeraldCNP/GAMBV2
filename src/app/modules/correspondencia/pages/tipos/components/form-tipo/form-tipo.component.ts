import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  private snackBar = inject(MatSnackBar)

  currentFile?: File;
  progress = 0;
  message = '';
  fileName = 'Seleccione un archivo con la extención .docx';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormTipoComponent>) {

  }


  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Seleccione un archivo con la extención .docx';
    }
  }



  upload(): void {
    this.progress = 0;
    this.message = "";

    const formData = new FormData();




    if (this.currentFile) {
      formData.append('file', this.currentFile);
      formData.append('nombreTipo', this.tipoForm.value.nombreTipo);
      formData.append('siglaTipo', this.tipoForm.value.siglaTipo);

      this.tipoService.uploadPlantilla(formData).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
            console.log(event);
          } else if (event instanceof HttpResponse) {
            console.log(event);

            this.snackBar.open(event.body.serverResponse, 'Cerrar', {
              duration: 3000
            });

            this.router.navigate(['correspondencia/tipo/index']);
            this.closeDialog('submited')
            // this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });
    }
  }

  ngOnInit(): void {
    this.inputData = this.data;
    // console.log(this.inputData);

    if (this.inputData.id != 0) {
      this.loadTipoForId(this.inputData.id);
    }
    // this.cargarTipos();
  }

  public tipoForm: FormGroup = this.fb.group({
    nombreTipo: ['', [Validators.required]],
    siglaTipo: ['', [Validators.required, Validators.minLength(2)]],
    file: ['', [Validators.required]],
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



  toggleChanged() {
    this.tipoForm.value.isActive = !this.tipoForm.value.isActive;
  }

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

  editTipo(id: string) {
    this.progress = 0;
    this.message = "";

    const formData = new FormData();
    if (this.currentFile) {
      formData.append('file', this.currentFile);
      formData.append('nombreTipo', this.tipoForm.value.nombreTipo);
      formData.append('siglaTipo', this.tipoForm.value.siglaTipo);
      this.tipoService.editTipo(formData, id).subscribe({
        next: (event: any) => {

          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
            console.log(event);
          } else if (event instanceof HttpResponse) {
            console.log(event);

            this.snackBar.open(event.body.serverResponse, 'Cerrar', {
              duration: 3000
            });

            this.router.navigate(['correspondencia/tipo/index']);
            this.closeDialog('submited')
            // this.fileInfos = this.uploadService.getFiles();
          }

          this.closeDialog('edited');
          // console.log("resp",resp);
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        }
      })
    }


  }



}
