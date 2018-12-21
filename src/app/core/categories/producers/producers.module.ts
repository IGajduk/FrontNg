import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducersRoutingModule } from './producers-routing.module';
import { AllProducersComponent } from './all-producers/all-producers.component';
import { SingleProducerComponent } from './single-producer/single-producer.component';
import { EditProducerComponent } from './edit-producer/edit-producer.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AllProducersComponent, SingleProducerComponent, EditProducerComponent],
  imports: [
    CommonModule,
    ProducersRoutingModule,
    FormsModule
  ]
})
export class ProducersModule { }
