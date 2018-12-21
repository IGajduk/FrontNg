import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categoryInput: Category = new Category();

  constructor() {
  }

  ngOnInit() {
  }

}
