import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllProducersComponent} from './all-producers/all-producers.component';
import {EditProducerComponent} from './edit-producer/edit-producer.component';
import {SingleProducerComponent} from './single-producer/single-producer.component';

const routes: Routes = [
  {path: '', component: AllProducersComponent},
  {path: 'edit/:id', component: EditProducerComponent},
  {path: 'single/:id', component: SingleProducerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducersRoutingModule { }
