import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.signupForm = this.fb.group({
      name: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
      confirmPassword: [undefined, Validators.required]
    });
  }

  ngOnInit() {
    this.signupForm.valueChanges.subscribe(x => {
      console.log(x);
    })
  }

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }
  
  toggleHideConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    const password = this.signupForm.get('password')!.value;
    const confirmPassword = this.signupForm.get('confirmPassword')!.value;
    
    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }
    
    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Sign up successful!', 'Close', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackBar.open('Sign up failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    });
  }
}
