import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../../models/Product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() singleProductInput: Product;
  constructor() { }

  ngOnInit() {
  }

}
