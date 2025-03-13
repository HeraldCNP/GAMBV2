import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SafePipe } from 'src/app/core/pipes/safe.pipe';
import { ValeService } from 'src/app/modules/almacen/services/vale.service';

@Component({
  selector: 'app-print-vale',
  templateUrl: './printVale.component.html',
  styleUrl: './printVale.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintValeComponent {
  private fb = inject(FormBuilder);
  private valeService = inject(ValeService);
  dialog: any;
  pdfUrl: any = '';
  inputData: any;
  constructor(
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PrintValeComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData.id);

    this.printVale(this.inputData.id);
    /* this.params.isFinish = 'false';
    this.planillaGeneral(this.params); */
  }
  printVale(id: any) {
    const url = this.valeService.printVale(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfUrl = fileURL;
      console.log(this.pdfUrl);
      
    });
  }
}
