import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-list-hr',
  templateUrl: './list-hr.component.html',
  styleUrls: ['./list-hr.component.css']
})
export class ListHrComponent {
  hojas: any;
  hojaRuta: any;
  seguimiento: any;
  existe:boolean = false;

  constructor(private activeRouter: ActivatedRoute, private api: HomeService) {

  }

  ngOnInit(): void {
    this.activeRouter.params
      .pipe(
        switchMap(({ termino }) => this.api.getHr(termino))
      )
      .subscribe(resp => {
        this.hojas = resp.serverResponse;
        if (this.hojas.length === 0) {
          console.log('no hay nada');
        } else {
          this.existe = true;
        }
      })
  }

  segui(id: any) {
    //this.loading = true;
    this.api.obtenerHoja(id).subscribe(data => {

      this.hojaRuta = data.serverResponse;
      console.log(this.hojaRuta);
      let n = this.hojaRuta.seguimiento.length - 1;
      this.seguimiento = this.hojaRuta.seguimiento[n];
      console.log('segui', this.seguimiento);



    }, error => {
      console.log(error);
    })

  }

}
