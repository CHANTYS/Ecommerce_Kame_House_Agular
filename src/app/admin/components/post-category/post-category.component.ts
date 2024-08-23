import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private adminService: AdminService) { 
    this.categoryForm = this.fb.group({
      name: [undefined, [Validators.required]],
      description: [undefined, Validators.required],
    });
  }
  
  addCategory(): void {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Category Posted Successfully', 'Close', {
            duration: 5000,
          });

          this.router.navigateByUrl('/admin/dashboard');
        }, 
        error: (error) => {
          this.snackBar.open('errors.message', 'Close', {
            duration: 5000,
          });
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }  
}
