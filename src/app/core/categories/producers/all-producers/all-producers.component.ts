import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import {Producer} from '../../../../models/Producer';
import {ProducersService} from '../../../../services/producers.service';

@Component({
  selector: 'app-all-producers',
  templateUrl: './all-producers.component.html',
  styleUrls: ['./all-producers.component.css']
})
export class AllProducersComponent implements OnInit {

  producers: Producer[] = [];

  constructor(
    private producersService: ProducersService
  ) {
  }

  ngOnInit() {
    this.getProducers();
  }

  private getProducers() {
    this.producersService.getAllProducers().subscribe((res) => {
      this.producers = res ? res : [];
    });
  }

  removeProducer(producer: Producer) {
    console.log(producer);
    this.producersService.deleteProducer(producer._id).subscribe(() => {
      this.getProducers();
    });
  }

  createProducer(producerForm: NgForm) {
    this.producersService.createProducer(producerForm.value).subscribe((newProducer) => {
      this.producers.push(newProducer);
    });
  }

}
