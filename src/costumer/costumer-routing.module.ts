import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumerComponent } from './costumer.component';

const routes: Routes = [{ path: '', component: CostumerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumerRoutingModule { }
