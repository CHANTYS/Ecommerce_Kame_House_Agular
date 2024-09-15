import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {
  productForm: FormGroup;
  listOfCategories: any = [];
  selectedFile?: File;
  imagePreview?: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {

    this.productForm = this.fb.group({
      category: [undefined, Validators.required],
      name: [undefined, Validators.required],
      price: [undefined, Validators.required],
      description: [undefined]
    });

    this.getAllCategories();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.selectedFile!);
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe(res => {
      this.listOfCategories = res;
    });
  }

  addProduct() {
    this.productForm.updateValueAndValidity();

    if (!this.productForm.valid)
      return;
    
    const formData = new FormData();
    formData.append('img', this.selectedFile!);
    formData.append('categoryId', this.productForm.get('category')!.value);
    formData.append('name', this.productForm.get('name')!.value);
    formData.append('description', this.productForm.get('description')!.value);
    formData.append('price', this.productForm.get('price')!.value);
  
    this.adminService.addProduct(formData).subscribe((res) => {
      if (res) {
        this.snackBar.open('Product Posted Successfully!', 'Close', {
          duration: 5000
        });
        
        this.router.navigateByUrl('/admin/dashboard');
      } else
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000
        });
    });
  }
}
