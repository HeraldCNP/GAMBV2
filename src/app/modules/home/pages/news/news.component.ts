import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  posts:any = [];
  URL = environment.api;
  constructor(
    private api: HomeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.api.getAllPosts().subscribe(res => {
      this.posts = res;
    });
  }

  getPost(id:any){
    this.router.navigate(['/post', id]);
  }
}
