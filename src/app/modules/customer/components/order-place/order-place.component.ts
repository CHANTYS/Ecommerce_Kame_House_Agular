import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.scss']
})
export class OrderPlaceComponent {
  orderForm!: FormGroup;
  mp: any;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialog: MatDialog) { 
    this.customerService.createPreference().subscribe({
      next: (response) => {
        console.log(response);
        const thatWindow = window as any;
        this.mp = new thatWindow.MercadoPago('APP_USR-cf456223-1042-45e4-83bb-a7d646adcc35');
        this.mp.bricks()
               .create("wallet", "wallet_container", {
                  initialization: {
                    preferenceId: response.id,
                    redirectMode: 'modal'
                  },
                  callbacks: {
                    onError: (error) => console.error(error),
                    onSubmit: () => {
                      this.customerService.orderAddress = this.orderForm.get('address')!.value;
                      this.customerService.orderAddressDescription = this.orderForm.get('orderDescription')?.value;
                    }
                  }
                }).then();
      }
    });
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    });
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
