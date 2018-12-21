import { Component, OnInit } from '@angular/core';
import {Category} from '../../../models/Category';
import {CategoriesService} from '../../../services/categories.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  categories: Category[] = [];
  principalUser: boolean;
  constructor(
    private categoriesService: CategoriesService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }
  private getCategories() {
    this.categoriesService.getAll().subscribe((res: any) => {
      this.categories = res.aa ? res.aa : [];
      this.principalUser = !!res.vv;
      // this.http.get('http://localhost:3000/principal').subscribe((p) => console.log(p));
    });
  }

  removeCategory(category: Category) {
    this.categoriesService.delete(category._id).subscribe(() => {
      this.getCategories();
    });
  }

  createCategory(categoryForm: NgForm) {
    this.categoriesService.create(categoryForm.value).subscribe((newCategory) => {
      this.categories.push(newCategory);
    });
  }

}
