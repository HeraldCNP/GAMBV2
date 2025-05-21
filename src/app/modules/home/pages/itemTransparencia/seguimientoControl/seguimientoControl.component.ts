import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SegControlService } from 'src/app/modules/dashboard/services/segControl.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seguimiento-control',
 // standalone: true,
  //imports: [],
  templateUrl: './seguimientoControl.component.html',
  styleUrl: './seguimientoControl.component.css',
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeguimientoControlComponent implements OnInit { 

  segControl: any = [];
  URL = environment.api;
   private api = inject(SegControlService);

  ngOnInit(): void {
    this.getSegControl();
  }

  getSegControl() {
    this.api.getAllSegControlAct().subscribe((res: any) => {
      this.segControl = res;
    });
  }
}
