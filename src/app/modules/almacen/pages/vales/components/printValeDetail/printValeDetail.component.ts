import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ValeService } from 'src/app/modules/almacen/services/vale.service';

@Component({
  selector: 'app-print-vale-detail',
  templateUrl: './printValeDetail.component.html',
  styleUrl: './printValeDetail.component.css',
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintValeDetailComponent { 
   private valeService = inject(ValeService);
    dialog: any;
    pdfUrl: any = '';
    inputData: any;
    constructor(
      private matDialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
     // private ref: MatDialogRef<PrintValeComponent>
    ) {}

     ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData.id);

    this.printValeDetail(this.inputData.id);
    /* this.params.isFinish = 'false';
    this.planillaGeneral(this.params); */
  }
  printValeDetail(id: any) {
    const url = this.valeService.printValeDetail(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfUrl = fileURL;
      console.log(this.pdfUrl);
      
    });
  }
}
