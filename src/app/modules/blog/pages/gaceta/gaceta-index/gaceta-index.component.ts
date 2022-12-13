import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-gaceta-index',
  templateUrl: './gaceta-index.component.html',
  styleUrls: ['./gaceta-index.component.css']
})
export class GacetaIndexComponent implements OnInit {
  URL = environment.api;
  status: any;
  constructor(
    private router: Router,
    private api: BlogService
  ) { }

  gacetas: any = [];

  ngOnInit(): void {
    this.getGacetas();
  }

  getGacetas(){
    this.api.getAllGacetas().subscribe
    (res => {
      this.gacetas = res;
      console.log(this.gacetas)
    });
  }

  changeStatus(id:any, estado:any){
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)


    this.api.changeEstado(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {

        }
      );
  }

  crearConvenio(form: any) {
    
  }

  

  registerGaceta(){

  }

  addGaceta(){
    this.router.navigate(['blog/gaceta/create'])
  }

  updateGaceta(id:string){

  }

  deleteGaceta(id:string){

  }
}
