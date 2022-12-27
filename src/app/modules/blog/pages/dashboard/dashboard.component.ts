import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

// declare function customInitFunctions():void;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  posts: any = [];

  currentRoute: string;


  constructor(
    private api: BlogService,
    private router: Router
  ) {
    this.currentRoute = "Demo";
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        // console.log(event);
      }

    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.idUser = this.data.id;
    console.log(this.data)
    if (this.data.roles == "SUPER_ADMIN") {
      this.getPosts();
    }
  }

  getPosts() {
    this.api.getAllPosts().subscribe
      (res => {
        this.posts = res;
        console.log(this.posts.totalDocs)
      });
  }



}
