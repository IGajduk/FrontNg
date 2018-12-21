import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../models/Product';
import {CategoriesService} from '../../../../services/categories.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-products-by-category-id',
  templateUrl: './products-by-category-id.component.html',
  styleUrls: ['./products-by-category-id.component.css']
})
export class ProductsByCategoryIdComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => this.getProductsByCatId(res));
  }

  private getProductsByCatId(params) {
    if (params.id) {
      this.categoriesService.getProductsByCategoryId(params.id).subscribe((res) => {
        this.products = res ? res : [];
        console.log(res);
      });
    }
  }

}
