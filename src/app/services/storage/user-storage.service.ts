import { Injectable } from '@angular/core';


const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  saveToken(token: string) {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  saveUser(user: unknown) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    if (!user)
      return undefined;

    return JSON.parse(user);
  }

  static getUserId(): string | undefined {
      const user = this.getUser();
  
      return user?.userId;
  }

  static getUserRole(): string | undefined {
      const user = this.getUser();

      return user?.userRole;
  }

  static isAdminLoggedIn(): boolean {
    if (!this.getToken())
        return false;

    const role: string = this.getUserRole()!;
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
      if (!this.getToken())
        return false;

      const role: string = this.getUserRole()!;
      return role === 'CUSTOMER';
  }

  static signout() {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
  }

}
