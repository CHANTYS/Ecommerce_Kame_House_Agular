import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.loginForm.updateValueAndValidity();
    if (!this.loginForm.valid)
      return;

    const userName = this.loginForm.get("email")!.value;
    const password = this.loginForm.get("password")!.value;

    this.authService.login(userName, password)
                    .subscribe({
                      next: res => {
                        if (UserStorageService.isAdminLoggedIn())
                          this.router.navigateByUrl('admin/dashboard');
                        else if (UserStorageService.isCustomerLoggedIn())
                          this.router.navigateByUrl('costumer/dashboard');
                      },
                      error: () => {
                        this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
                      }
                    });
  }
}
