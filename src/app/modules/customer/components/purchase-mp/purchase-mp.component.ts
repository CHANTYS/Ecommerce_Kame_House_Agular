import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-mp',
  templateUrl: './purchase-mp.component.html',
  styleUrls: ['./purchase-mp.component.scss']
})
export class PurchaseMPComponent {
  constructor(private customerService: CustomerService,
              private activedRoute: ActivatedRoute,
              private route: Router) {    
    this.activedRoute.queryParams.subscribe(params => {
      const paymentId = params['payment_id'];
      const status = params['status'];

      if (status === 'approved') {
        this.route.navigate(['customer/dashboard']);
      }
    });
  }
}
