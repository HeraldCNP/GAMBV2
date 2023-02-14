import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../../../services/home.service';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  visits: number = 0;
  constructor(private api: HomeService, private cookieService: CookieService) { }

  ngOnInit(): void {

    const visitsCookie = this.cookieService.get('visits');
    if (visitsCookie) {
      this.visits = parseInt(visitsCookie, 10);
    } else {
      this.api.incrementCounterValue();
      this.api.getCounterValue().subscribe(value => {
        this.visits = value;
      });
    }



  }


}
