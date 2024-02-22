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

  constructor(private activeRouter: ActivatedRoute, private api: HomeService) {

  }

  ngOnInit(): void {
    this.activeRouter.params
      .pipe(
        switchMap(({ termino }) => this.api.getHr(termino))
      )
      .subscribe(resp => {
        this.hojas = resp.serverResponse;
        console.log(this.hojas)
      })
  }

  segui(id: any) {
    //this.loading = true;
    this.api.obtenerHoja(id).subscribe(data => {
      // this.loading = false;
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
