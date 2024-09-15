import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/service/admin.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products = new Array<any>();
  searchProductForm: FormGroup;
  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { 
    this.searchProductForm = this.fb.group({
      title: [undefined, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  submitForm() {
    this.searchProductForm.updateValueAndValidity();

    if (!this.searchProductForm.valid)
      return;

    this.products = new Array<any>();
    const title = this.searchProductForm.get('title')?.value;

    this.customerService.getAllProductByName(title).subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      }
    });
  }

  addToCart(productId: number) {
    this.customerService.addToCart(productId).subscribe({
      next: res => {
        this.snackBar.open('Product added to cart Successfully!', 'Close', {
          duration: 5000
        });
      }
    })
  }

  private getAllProducts() {
    this.products = new Array<any>();

    this.customerService.getAllProducts().subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      }
    });
  }
}
