import { AfterViewInit, Component, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements DoCheck {

  products: any[] = [];
  searchProductForm!: FormGroup;
  isSpinning = false;

  readyLoadARModels = false;
  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }
  ngDoCheck(): void {
    if (!this.readyLoadARModels)
      return;

    this.products.forEach((product, i) => {
      if (product?.fileName?.includes('.glb') || product?.fileName?.includes('.gltf')) {
        const modelViewer = document.querySelector("#model-viewer-" + i) as any;
        if (modelViewer) {
          modelViewer.src = 'data:text/plain;charset=utf-8;base64,' + product.returnedImg;
          this.readyLoadARModels = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.searchProductForm = this.fb.group({
      title: [undefined],
    });
    this.getAllProducts();

  }

  submitForm(): void {
    this.isSpinning = true;
    this.products = [];
    const title = this.searchProductForm.get('title')?.value;

    if (title)
      this.adminService.getProductsByTitle(title).subscribe((res) => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.products.push(element);
        });
        this.isSpinning = false;
      });
    else
      this.getAllProducts();

  }

  getAllProducts(): void {
    this.isSpinning = true;
    this.products = [];
    this.adminService.getAllProducts().subscribe((res) => {
      console.log(res);
      res.forEach((product, i) => {
        if (product?.fileName?.includes('.jpeg') || product?.fileName?.includes('.jpg')) {
          product.processedImg = 'data:image/jpeg;base64,' + product.returnedImg;
        }
        this.products.push(product);
      });
      console.log(this.products);
      this.isSpinning = false;
      this.readyLoadARModels = true;
    });
  }

  deleteProduct(productId: any): void {
    this.adminService.deleteProductById(productId).subscribe((res) => {
      if (res.body == null) {
        this.snackBar.open('Product Deleted Successfully!', 'Close', {
          duration: 5000
        });
        this.getAllProducts();
      } else {
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }
}
