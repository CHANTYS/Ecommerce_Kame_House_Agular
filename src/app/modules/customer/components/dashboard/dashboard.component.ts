import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';

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
    private customerService: CustomerService,
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
      this.customerService.getProductsByTitle(title).subscribe((res) => {
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
    this.customerService.getAllProducts().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
      this.isSpinning = false;
      this.readyLoadARModels = true;

    });
  }

  addToCart(event: Event,productId: any) {
    event.stopPropagation();
    this.customerService.addToCart(productId).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open("Product added to cart successfully", "Close", { duration: 5000 })
      } else if (res.id == null) {
        this.snackBar.open("Product already exist in the cart", "Close", { duration: 5000 })
      }
    });
  }

}
