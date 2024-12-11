import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { Form, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { SelectYearComponent } from 'src/app/components/select-year/select-year.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComprasService } from 'src/app/modules/almacen/services/compras.service';
import { CorrespondenciasService } from 'src/app/modules/correspondencia/services/correspondencias.service';
import { DependenciasService } from 'src/app/modules/correspondencia/services/dependencias.service';
import { TiposService } from 'src/app/modules/correspondencia/services/tipos.service';
import { AsyncPipe } from '@angular/common';
import { Event } from '@angular/router';
import { ChargesComponent } from '../../../../../auth/pages/charges/charges.component';

@Component({
  selector: 'app-form-correspondencia',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, SelectYearComponent, AsyncPipe],
  templateUrl: './form-correspondencia.component.html',
  styleUrl: './form-correspondencia.component.css'
})
export class FormCorrespondenciaComponent implements OnInit {

  private fb = inject(FormBuilder);
  private dependenciaService = inject(DependenciasService);
  private tipoService = inject(TiposService);
  private correspondenciaService = inject(CorrespondenciasService);
  private comprasService = inject(ComprasService);

  idUser: any;
  user: any;
  dataUser: any;

  editData: any;

  inputData: any;
  firstFormGroup: any;
  secondFormGroup: any;

  dependencias = signal<any>(null);
  tipos = signal<any>(null);
  subTipos = signal<any>(null);
  dependencia = signal<any>(null);
  funcionarios: any[] = [];
  cite = signal<string>('hu');
  isUser = signal<boolean>(true);
  isVia = signal<boolean>(false);
  isOtherUnidad = signal<boolean>(false);
  filteredFuncionarios: Observable<any[]>;
  filteredDestinoFuncionarios: Observable<any[]>;




  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormCorrespondenciaComponent>) {
    this.user = localStorage.getItem('user');
    this.dataUser = JSON.parse(this.user);
    this.idUser = this.dataUser.id;
    console.log(this.dataUser);
    

    this.firstFormGroup = this.fb.group({
      gestion: ['', [Validators.required]],
      idDependencia: [this.dataUser.dependencia, Validators.required],
      idSubTipo: [''],
      idTipo: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      nombreDestino: ['', Validators.required],
      cargoDestino: ['', Validators.required],
      entidadDestino: [''],
      lugarDestino: [''],
      fsAdjunto: ['1'],
      hojaRuta: [''],
      referencia: ['', Validators.required],
      via: [''],
      genero: ['Señor'],
    });

    this.getFuncionarios();



    this.filteredFuncionarios = this.secondFormGroup.get('via').valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.funcionarios.slice())),
    );

    this.filteredDestinoFuncionarios = this.secondFormGroup.get('nombreDestino').valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.funcionarios.slice())),
    );



  }



  ngOnInit(): void {
    this.inputData = this.data;
    this.getDependencias();
    this.getTipos();
    this.getDependencia();
  }

  private _filterStates(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.funcionarios.filter(state => state.username.toLowerCase().includes(filterValue));
  }

  get formSecond() {
    return this.secondFormGroup.controls;
  }

  // Método que se llama cuando se selecciona un funcionario
  onFuncionarioSelected(cargo: any): void {
    // console.log('Funcionario seleccionado:', cargo);
    this.correspondenciaService.getFuncionario(cargo).subscribe((data: any) => {
      // console.log(data.serverResponse);
      let funciona = data.serverResponse;
      this.secondFormGroup.get('nombreDestino').setValue(funciona.username + ' ' + funciona.surnames);
      this.secondFormGroup.get('cargoDestino').setValue(funciona.post);
    })
  }

  // onViaSelected(cargo: any): void {
  //   this.correspondenciaService.getFuncionario(cargo).subscribe((data: any) => {
  //     // console.log(data.serverResponse);
  //     let funciona = data.serverResponse;
  //     this.secondFormGroup.get('via').setValue(funciona.username + ' ' + funciona.surnames);
  //   })
  // }

  getTipos() {
    this.tipoService.getTipos()
      .subscribe({
        next: (data: any) => {
          this.tipos.set(data.serverResponse);
          // console.log(this.tipos());
        }
      })
  }

  getDependencia() {
    this.dependenciaService.getDependencia(this.dataUser.dependencia)
      .subscribe({
        next: (data: any) => {
          this.dependencia.set(data);
          console.log(this.dependencia());
        }
      })
  }

  tipoDestino(Event: any) {
    console.log(Event.value);
    if (Event.value == 'Interno') {
      this.isUser.set(true);
    } else {
      this.isUser.set(false);
    }
  }

  via(Event: any){
    this.isVia.set(Event.checked);
    console.log(this.isVia());
  }

  otherUnidad(Event: any){
    this.isOtherUnidad.set(Event.checked);
    console.log(this.isOtherUnidad());
  }

  isMr(Event: any) {
    
    if (Event == 'Señor') {
      this.secondFormGroup.get('genero').setValue("Señor");
    }
  }

  isMrs(Event: any) {
    if (Event == 'Señora') {
      this.secondFormGroup.get('genero').setValue("Señora");
    }
  }

  tipoChange(idTipo: string) {
    this.tipoService.getTipo(idTipo)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.idSubTipos.length > 0) {
            this.subTipos.set(data.idSubTipos);
          } else {
            this.subTipos.set(null);
          }
        }
      })
  }

  getDependencias() {
    this.dependenciaService.getDependencias()
      .subscribe({
        next: (data: any) => {
          this.dependencias.set(data.serverResponse);
          // console.log(this.dependencias());
        }
      })
  }



  getFuncionarios() {
    this.comprasService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      // console.log("Funcionarios", this.funcionarios)
    });
  }


  createCorrespondencia() {
    const formData: any = {

      gestion: this.firstFormGroup.get('gestion').value,
      idDependencia: this.firstFormGroup.get('idDependencia').value,
      idSubTipo: this.firstFormGroup.get('idSubTipo').value,
      idTipo: this.firstFormGroup.get('idTipo').value,

      nombreDestino: this.secondFormGroup.get('nombreDestino').value,
      cargoDestino: this.secondFormGroup.get('cargoDestino').value,
      fsAdjunto: this.secondFormGroup.get('fsAdjunto').value, 
      
      hojaRuta: this.secondFormGroup.get('hojaRuta').value,
      referencia: this.secondFormGroup.get('referencia').value,
      via: this.secondFormGroup.get('via').value,
      lugarDestino: this.secondFormGroup.get('lugarDestino').value,


      idUsuario: this.idUser,
    };

    console.log(formData);

    this.correspondenciaService.createCorrespondencia(formData).subscribe({
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

  closeDialog(data: any) {
    this.ref.close(data);
  }



  buscarUltimo(params?: any) {
    this.correspondenciaService.buscarUltimo(params)
      .subscribe({
        next: (data: any) => {
          console.log(data.serverResponse);
          this.cite.set(data.serverResponse.fileName);
          console.log('cite', this.cite());
        },
        error: (message: any | undefined) => {
          console.log(message);
        }
      })
  }




}
