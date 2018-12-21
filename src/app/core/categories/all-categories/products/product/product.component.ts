import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../../models/Product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productInput: Product;
  constructor(
    private productsService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

   ngOnInit() {
     this.activatedRoute.params.subscribe(res => this.getProductById(res));
   }

  private getProductById(params) {
    if (params.id) {
      this.productsService.getById(params.id).subscribe(res => {
        this.productInput = res;
      });
    }
  }
}
