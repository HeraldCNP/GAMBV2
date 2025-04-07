import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recursos-humanos',
  // standalone: true,
  // imports: [],
  templateUrl: './recursosHumanos.component.html',
  styleUrl: './recursosHumanos.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecursosHumanosComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

}
