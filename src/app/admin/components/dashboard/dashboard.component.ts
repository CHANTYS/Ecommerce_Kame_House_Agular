import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products = new Array<any>();
  searchProductForm: FormGroup;
  constructor(private adminService: AdminService,
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

    this.adminService.getAllProductByName(title).subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      }
    });
  }

  deleteProduct(productId: number) {
    this.adminService.deleteProduct(productId).subscribe({
      next: (res) => {
        if (!res) {
          this.snackBar.open('Product Deleted Successfully!', 'Close', {
            duration: 5000
          });

          this.getAllProducts();
        } else
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
      }
    });
  }

  private getAllProducts() {
    this.products = new Array<any>();

    this.adminService.getAllProducts().subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      }
    });
  }
}
