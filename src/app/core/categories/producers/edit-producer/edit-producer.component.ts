import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Producer} from '../../../../models/Producer';
import {ProducersService} from '../../../../services/producers.service';

@Component({
  selector: 'app-edit-producer',
  templateUrl: './edit-producer.component.html',
  styleUrls: ['./edit-producer.component.css']
})
export class EditProducerComponent implements OnInit {

  producer: Producer = new Producer();

  constructor(
    private activatedRoute: ActivatedRoute,
    private producersService: ProducersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.producer = <Producer>data;
    });
  }

  updateProducer(producerForm: NgForm) {
    this.producer = {...this.producer, ...producerForm.value};
    this.producersService.updateProducer(this.producer._id, this.producer).subscribe((res) => {
      this.producer = res;
      this.router.navigate([`producers/single/${this.producer._id}`], {});
    });
  }


}
