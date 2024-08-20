import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostumerRoutingModule } from './costumer-routing.module';
import { CostumerComponent } from './costumer.component';


@NgModule({
  declarations: [
    CostumerComponent
  ],
  imports: [
    CommonModule,
    CostumerRoutingModule
  ]
})
export class CostumerModule { }
