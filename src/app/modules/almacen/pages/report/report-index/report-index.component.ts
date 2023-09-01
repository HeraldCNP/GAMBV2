import { Component, OnInit } from '@angular/core';
import { ReportAlmService } from '../../../services/report-alm.service';

@Component({
  selector: 'app-report-index',
  templateUrl: './report-index.component.html',
  styleUrls: ['./report-index.component.css']
})
export class ReportIndexComponent implements OnInit {

  constructor(private reportAlm: ReportAlmService) { }
  cantidad:any;
  ngOnInit(): void {
    this.getCantidades()
  }

  getCantidades() {
    this.reportAlm.getCantidades().subscribe((data: any) => {
      this.cantidad = data;
      console.log("Cantidades", this.cantidad)
    });
  }
}
