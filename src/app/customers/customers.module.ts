import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    DemoAngularMaterialModule
  ]
})
export class CustomersModule { }
