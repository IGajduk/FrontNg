import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import {Product} from '../../../../../models/Product';
import {ProductService} from '../../../../../services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productsService: ProductService
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }
  private getProducts() {
    this.productsService.getAll().subscribe((res) => {
      this.products = res ? res : [];
    });
  }

  removeProduct(product: Product) {
    this.productsService.delete(product._id).subscribe(() => {
      this.getProducts();
    });
  }

  createProduct(productForm: NgForm) {
    this.productsService.create(productForm.value).subscribe((newProduct) => {
      this.products.push(newProduct);
    });
  }

}
