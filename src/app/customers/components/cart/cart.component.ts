import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems = new Array<any>();
  order: any;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getCart();
  }

  private getCart() {
    this.cartItems = new Array<any>();

    this.customerService.getCartByUserId().subscribe({
      next: (res: any) => {
        this.order = res;
        res.cartItems.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.cartItems.push(element);
        })
      }
    });
  }
}
