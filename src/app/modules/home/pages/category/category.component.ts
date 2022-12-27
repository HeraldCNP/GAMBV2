import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { borderRightStyle } from 'html2canvas/dist/types/css/property-descriptors/border-style';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  URL = environment.api;
  categoryName: any;
  posts:any; 
  constructor(private activeRouter: ActivatedRoute, private router: Router, private api:HomeService) { }

  ngOnInit(): void {
    this.activeRouter.params
    .pipe(
      switchMap( ({ name }) => this.api.getNoticias( name ) )
    )
    .subscribe(resp => {
      this.posts = resp
      console.log(resp)
    })
  }





}
