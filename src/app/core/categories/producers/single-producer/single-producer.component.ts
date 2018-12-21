import {Component, Input, OnInit} from '@angular/core';
import {Producer} from '../../../../models/Producer';
import {ActivatedRoute} from '@angular/router';
import {ProducersService} from '../../../../services/producers.service';

@Component({
  selector: 'app-single-producer',
  templateUrl: './single-producer.component.html',
  styleUrls: ['./single-producer.component.css']
})
export class SingleProducerComponent implements OnInit {

  @Input() producerInput: Producer = new Producer();

  constructor(
    private producersService: ProducersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => this.getProductById(res));
  }

  private getProductById(params) {
    if (params.id) {
      this.producersService.getProducerById(params.id).subscribe(res => {
        this.producerInput = res;
      });
    }
  }

}
