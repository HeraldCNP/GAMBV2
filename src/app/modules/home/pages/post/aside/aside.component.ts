import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  categories:any = [];
  posts:any = [];
  URL = environment.api;

  constructor( private api: HomeService) { }

  ngOnInit(): void {
    this.api.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.api.getAllPosts().subscribe(res => {
      this.posts = res;
      console.log(this.posts)
    });
  }

}
