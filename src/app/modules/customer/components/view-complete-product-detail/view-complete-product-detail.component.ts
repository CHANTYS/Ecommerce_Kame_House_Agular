import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from 'src/app/auth/auth-services/storage-service/user-storage.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-complete-product-detail',
  templateUrl: './view-complete-product-detail.component.html',
  styleUrls: ['./view-complete-product-detail.component.scss']
})
export class ViewCompleteProductDetailComponent implements DoCheck {

  productId: number = this.activatedRoute.snapshot.params["productId"];
  isSpinning: boolean = false;
  reviewForm!: FormGroup;
  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];
  readyLoadARModels = false;
  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngDoCheck(): void {
    if (!this.readyLoadARModels)
      return;

      if (this.product?.fileName?.includes('.glb') || this.product?.fileName?.includes('.gltf')) {
        const modelViewer = document.querySelector("#model-viewer") as any;
        if (modelViewer) {
          modelViewer.src = 'data:text/plain;charset=utf-8;base64,' + this.product.returnedImg;
          this.readyLoadARModels = false;
        }
      }
  }


  ngOnInit(): void {
    this.getCompleteProductDetailById();
  }

  addToWishlist(): void {
    this.isSpinning = true;
    const wishlistDto = {
      productId: this.productId,
      userId: UserStorageService.getUserId(),
    }
    this.customerService.addProductToWishlist(wishlistDto).subscribe((res) => {
      this.isSpinning = false;
      if (res.id != null) {
        this.snackBar.open('Product Added to Wishlist Successfully!', 'Close', {
          duration: 5000
        });
      } else {
        this.snackBar.open("Already in Wishlist", 'ERROR', {
          duration: 5000
        });
      }
    });
  }

  getCompleteProductDetailById() {
    this.customerService.getCompleteProductDetailById(this.productId).subscribe(
      (res) => {
        console.log(res);
        this.product = res.productDto;
        if (res.productDto.returnedImg != null) {
          this.product.processedImg = 'data:image/png;base64,' + res.productDto.returnedImg;
          this.readyLoadARModels = true;
        }
        this.FAQS = res.faqDtoList;
        // this.Reviews = res.reviewDtoList;
        res.reviewDtoList.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.reviews.push(element);
        });
      }
    );
  }

}