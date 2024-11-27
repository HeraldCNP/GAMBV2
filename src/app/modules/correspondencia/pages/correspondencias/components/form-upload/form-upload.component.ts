import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { CorrespondenciasService } from 'src/app/modules/correspondencia/services/correspondencias.service';

@Component({
  selector: 'app-form-upload',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-upload.component.html',
  styleUrl: './form-upload.component.css'
})
export class FormUploadComponent {

  private fb = inject(FormBuilder);
  private correspondenciaService = inject(CorrespondenciasService)
  private snackBar = inject(MatSnackBar)
  private router = inject(Router)

  inputData: any;
  uploadForm: any;
  currentFile?: File;
  progress = 0;
  message = '';
  fileName = 'Seleccione un archivo con la extención .docx';
  fileInfos?: Observable<any>;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormUploadComponent>) {
    this.uploadForm = this.fb.group({
      gestion: ['', [Validators.required]],
      idDependencia: ['', Validators.required],
      idSubTipo: [''],
      idTipo: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData);

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

  uploadDocument(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.correspondenciaService.uploadDocument(this.currentFile, this.inputData.idCorrespondencia).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
            console.log(event);
          } else if (event instanceof HttpResponse) {
            console.log(event);

            this.snackBar.open(event.body.serverResponse, 'Cerrar', {
              duration: 3000
            });

            this.router.navigate(['correspondencia/index']);
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

  closeDialog(data: any) {
    this.ref.close(data);
  }


}
