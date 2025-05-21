import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { SegControlService } from '../../services/segControl.service';

@Component({
  selector: 'app-seg-control',
  templateUrl: './segControl.component.html',
  styleUrl: './segControl.component.css',
  
//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegControlComponent implements OnInit {
  segControl:any = [];
  URL = environment.api;

   private api = inject(SegControlService);
  constructor( private router: Router) {}

  ngOnInit(): void {
    this.getSegControl();
  }

  getSegControl() {
    this.api.getAllSegControl().subscribe((res: any) => {
      this.segControl = res;
      console.log('Control', this.segControl);
    });
  }
}
