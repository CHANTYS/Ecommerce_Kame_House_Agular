import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderPlaceComponent } from '../order-place/order-place.component';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent {

  order: any;
  couponForm!: FormGroup;
  productDtos = [];
  cartItems = {} as any;

  constructor(private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getCart();

    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    });
  }

  applyCoupon(){
    this.customerService.applyToken(this.couponForm.get(['code'])!.value).subscribe(res =>{
      this.snackBar.open("Coupon Applied Successfully", 'Close', {
        duration: 5000
      });
      this.getCart();
    }, error => {
      console.log(error)
      this.snackBar.open(error.error, 'Close', {
        duration: 5000
      });
    });
  }

  getCart() {
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe((res) => {
      console.log(res);
      this.productDtos = [...res.productDtos];
      this.cartItems = res;
      // this.cartItems = res.cartItems;
      // this.order = res;
    });
  }

  increaseQuantity(productId: any) {
    console.log("increase", productId);
    this.customerService.addPlusOnProduct(productId).subscribe(() => {
      this.snackbar.open('Product quantity increased.', 'Close', { duration: 5000 });
      this.getCart();
    });
  }

  decreaseQuantity(productId: any) {
    console.log("decrease", productId)
    this.customerService.addMinusOnProduct(productId).subscribe(() => {
      this.snackbar.open('Product quantity decreased.', 'Close', { duration: 5000 });
      this.getCart();
    });
  }


  placeOrder(): void {
    this.dialog.open(OrderPlaceComponent);
  }

}