import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListSliderI } from '../../blog/models/listSlider.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly URL = environment.api;


  constructor(private http: HttpClient) { }

  getAllSliders():Observable<ListSliderI[]>{
    let dir = `${this.URL}/slaider`;
    return this.http.get<ListSliderI[]>(dir)
  }
}


