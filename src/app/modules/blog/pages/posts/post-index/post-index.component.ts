import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css']
})
export class PostIndexComponent implements OnInit {

  posts:any = [];
  URL = environment.api;

  constructor(
    private api: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
    this.api.getAllPosts().subscribe
    (res => {
      this.posts = res;
      console.log(this.posts)
    });
  }

  addPost(){
    this.router.navigate(['blog/post/create'])
  }

  changeStatus(id:any, estado:any){
    let fd = new FormData();
    fd.append('status', estado);
    // console.log(estado)
    this.api.changeEstado(id, fd)
      .subscribe(
        res => {
          // console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getPosts();
        }
      );
  }



  onDeletePost(id:any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El Post ha sido eliminado.',
          'success'
        )
        this.api.deletePost(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getPosts() 
        );
      }
    })
  }

  onEditPost(id:any){
    this.router.navigate(['blog/post/update', id])
  }
}
