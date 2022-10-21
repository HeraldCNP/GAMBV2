import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvenioService } from '../../../services/convenio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enti-index',
  templateUrl: './enti-index.component.html',
  styleUrls: ['./enti-index.component.css']
})
export class EntiIndexComponent implements OnInit {
  entidades:any[] = [];
  URL = environment.api;
  constructor(
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEntidades();
  }

  getEntidades(){
    this.api.getAllRepresentantes().subscribe
    (res => {
      this.entidades = res;
      console.log(res)
    });
  }

  updateEntidad(id:any){

  }

  deleteEntidad(id:any){

  }

}
