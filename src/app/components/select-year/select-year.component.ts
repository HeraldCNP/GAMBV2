import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-select-year',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './select-year.component.html',
  styleUrl: './select-year.component.css'
})
export class SelectYearComponent {

  @Input() control!: FormControl ;
  @Input() clases!: string ;
  @Input() texto!: string ;
  years: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateYears(10); // Generar los últimos N años, puedes cambiar este valor según sea necesario
    console.log(this.clases);
    
  }

  generateYears(n: any): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: n }, (v, i) => currentYear - i);
  }

}
