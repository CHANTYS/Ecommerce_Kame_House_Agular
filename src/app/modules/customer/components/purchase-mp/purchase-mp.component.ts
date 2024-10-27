import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchase-mp',
  templateUrl: './purchase-mp.component.html',
  styleUrls: ['./purchase-mp.component.scss']
})
export class PurchaseMPComponent {
  constructor(private customerService: CustomerService,
              private activedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) {    
    this.activedRoute.queryParams.subscribe(params => {
      const paymentId = params['payment_id'];
      const status = params['status'];

      if (status === 'approved') {
        this.router.navigateByUrl("/customer/my_orders").then(() => {
          const order = {
            orderAddress: this.customerService.orderAddress,
            orderAddressDescription: this.customerService.orderAddressDescription,
            paymentId: paymentId
          }
          
          this.customerService.placeOrder(order).subscribe((res) => {
            if (res.id) {
              this.snackBar.open("Order placed successfully", "Close", { duration: 5000 })
            } else {
              this.snackBar.open("Something went wrong", "Close", { duration: 5000 })
            }
          });
        });
      }
    });
  }
}
