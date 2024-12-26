import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialModule } from 'src/app/material/material.module';
import { ValeService } from 'src/app/modules/almacen/services/vale.service';

@Component({
  selector: 'app-form-factura',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-factura.component.html',
  styleUrl: './form-factura.component.css'
})
export class FormFacturaComponent {

  private fb = inject(FormBuilder);
  // private dependenciaService = inject(DependenciasService);
  // private tipoService = inject(TiposService);
  // private correspondenciaService = inject(CorrespondenciasService);
  private valeService = inject(ValeService);
  private _snackBar = inject(MatSnackBar);

  idUser: any;
  user: any;
  dataUser: any;

  editData: any;

  inputData: any;
  facturaForm: any;


  dependencias = signal<any>(null);
  tipos = signal<any>(null);
  subTipos = signal<any>(null);
  dependencia = signal<any>(null);
  funcionarios: any[] = [];
  cite = signal<string>('hu');
  isUser = signal<boolean>(true);
  isVia = signal<boolean>(false);
  isOtherUnidad = signal<boolean>(false);
  // filteredFuncionarios: Observable<any[]>;
  // filteredDestinoFuncionarios: Observable<any[]>;

  fechaHoy = new Date().toISOString();


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormFacturaComponent>) {
    this.user = localStorage.getItem('user');
    this.dataUser = JSON.parse(this.user);
    this.idUser = this.dataUser.id;
    console.log(this.dataUser);


    this.facturaForm = this.fb.group({
      numeroFactura: ['', [Validators.required]],
      montoFactura: ['', [Validators.required]],
      fechaFactura: [this.fechaHoy.substr(0, 10), [Validators.required]],
    });


    this.getFuncionarios();


  }



  ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData);
    
  }

  get form() {
    return this.facturaForm.controls;
  }

  // Método que se llama cuando se selecciona un funcionario
  onFuncionarioSelected(cargo: any): void {
    // console.log('Funcionario seleccionado:', cargo);
    // this.correspondenciaService.getFuncionario(cargo).subscribe((data: any) => {
    //   // console.log(data.serverResponse);
    //   let funciona = data.serverResponse;
    //   this.secondFormGroup.get('nombreDestino').setValue(funciona.username + ' ' + funciona.surnames);
    //   this.secondFormGroup.get('cargoDestino').setValue(funciona.post);
    // })
  }

  // onViaSelected(cargo: any): void {
  //   this.correspondenciaService.getFuncionario(cargo).subscribe((data: any) => {
  //     // console.log(data.serverResponse);
  //     let funciona = data.serverResponse;
  //     this.secondFormGroup.get('via').setValue(funciona.username + ' ' + funciona.surnames);
  //   })
  // }

  getTipos() {
    // this.tipoService.getTipos()
    //   .subscribe({
    //     next: (data: any) => {
    //       this.tipos.set(data.serverResponse);
    //       // console.log(this.tipos());
    //     }
    //   })
  }

  getDependencia() {
    // this.dependenciaService.getDependencia(this.dataUser.dependencia)
    //   .subscribe({
    //     next: (data: any) => {
    //       this.dependencia.set(data);
    //       console.log(this.dependencia());
    //     }
    //   })
  }

  tipoDestino(Event: any) {
    console.log(Event.value);
    if (Event.value == 'Interno') {
      this.isUser.set(true);
    } else {
      this.isUser.set(false);
    }
  }

  via(Event: any) {
    this.isVia.set(Event.checked);
    console.log(this.isVia());
  }

  otherUnidad(Event: any) {
    this.isOtherUnidad.set(Event.checked);
    console.log(this.isOtherUnidad());
  }



  tipoChange(idTipo: string) {
    // this.tipoService.getTipo(idTipo)
    //   .subscribe({
    //     next: (data: any) => {
    //       console.log(data);
    //       if (data.idSubTipos.length > 0) {
    //         this.subTipos.set(data.idSubTipos);
    //       } else {
    //         this.subTipos.set(null);
    //       }
    //     }
    //   })
  }

  getDependencias() {
    // this.dependenciaService.getDependencias()
    //   .subscribe({
    //     next: (data: any) => {
    //       this.dependencias.set(data.serverResponse);
    //       // console.log(this.dependencias());
    //     }
    //   })
  }



  getFuncionarios() {
    // this.comprasService.getAllFuncionarios().subscribe((data: any) => {
    //   this.funcionarios = data.serverResponse;
    //   // console.log("Funcionarios", this.funcionarios)
    // });
  }


  closeDialog(data: any) {
    this.ref.close(data);
  }

  addFactura() {
    // this.inputData.idVale
    this.valeService.addFactura(this.facturaForm.value, this.inputData.id).subscribe((data: any) => {
      // console.log(data);
      this._snackBar.open('Factura Agregada Correctamente', 'Cerrar', {
        duration: 3000
      });
      this.closeDialog('added');
    }, error => {
      console.log(error);
    })
  }


}
