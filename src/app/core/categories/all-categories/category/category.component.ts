import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../../models/Category';
import {CategoriesService} from '../../../../services/categories.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categoryInput: Category = new Category();
  principalUser: any;
  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.categoriesService.getById(this.categoryInput._id).subscribe(
      (res: any) => {
        this.principalUser = !!res.user;
        this.categoryInput = res.result;
      }
    );
  }
  removeCategory(category: Category) {
    this.categoriesService.delete(category._id).subscribe((res) => {
      this.router.navigate([''], {});
    });
  }
}
