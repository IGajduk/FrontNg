import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Product} from '../../../../../models/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product();
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {

  this.activatedRoute.queryParams.subscribe((data) => {
  this.product = <Product>data;
});
}

updateProduct(productForm: NgForm) {
  this.product = {...this.product, ...productForm.value};
  this.productsService.update(this.product._id, this.product).subscribe((res) => {
    this.product = res;
    this.router.navigate([`products/single/${this.product._id}`], {});
  });
}
}
