import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-public-hr',
  templateUrl: './search-public-hr.component.html',
  styleUrls: ['./search-public-hr.component.css']
})
export class SearchPublicHrComponent {
  searchForm: any;
  cargando: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      // termino: ['', Validators.required]
      termino: ['']
    });
  }


  getHR() {
    this.router.navigate(['searchHr', this.searchForm.value.termino]);
  }

}
