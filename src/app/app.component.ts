import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from './auth/auth-services/storage-service/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      }
    });

    if (this.isAdminLoggedIn)
      this.router.navigate(['/admin/dashboard']);
    else if (this.isCustomerLoggedIn)
      this.router.navigate(['/customer/dashboard']);
    else
      this.router.navigate(['login']);
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}