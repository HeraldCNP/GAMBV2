import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {

  categories:any = [];
  URL = environment.api;
  categoryForm: FormGroup = new FormGroup({});

  constructor(
    private api: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createform(),
    this.getCategories()
  }

  getCategories(){
    this.api.getAllCategories().subscribe
    (res => {
      this.categories = res;
      console.log(res)
    });
  }

  createform(){
    this.categoryForm = new FormGroup({
      category : new FormControl('', Validators.required),
    })
  }



  onDeleteCategory(id:any){
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
          'La Categoria ha sido eliminada.',
          'success'
        )
        this.api.deleteCategory(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getCategories() 
        );
      }
    })
  }
  
  sendFormCategory(category: any){
    this.api.sendCategory(category).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
              this.router.navigate(['blog/category/index']),
              this.alertOk('success', 'Exito', 'Categoria Creada Correctamente', '2000'),
              this.getCategories(),
              this.createform()
            }
    )
  }

  alertOk( icon:any, title:any, text:any, timer:any){
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }
}
