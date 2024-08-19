import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    const userName = this.loginForm.get("email")!.value;
    const password = this.loginForm.get("password")!.value;

    this.authService.login(userName, password)
                    .subscribe({
                      next: res => {
                        if (res)
                          this.snackBar.open('Login Success', 'Ok', { duration: 5000 });
                        else
                          this.snackBar.open('Login Fail', 'Ok', { duration: 5000, panelClass: 'error-snackbar' });
                      }, 
                      error: () => {
                        this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
                      }
                    })
  }
}
