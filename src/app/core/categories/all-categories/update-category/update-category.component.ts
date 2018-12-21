import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Category} from '../../../../models/Category';
import {CategoriesService} from '../../../../services/categories.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  category: Category = new Category();

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.category = <Category>data;
    });
  }

  updateCategory(categoryForm: NgForm) {
    this.category = {...this.category, ...categoryForm.value};
    this.categoriesService.update(this.category._id, this.category).subscribe((res) => {
      this.category = res;
      this.router.navigate(['categories'], {});
    });
  }

}
