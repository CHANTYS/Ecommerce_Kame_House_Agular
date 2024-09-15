import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly BASIC_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<Array<any>>(this.BASIC_URL + 'api/admin/products', { 
      headers: this.createAuthorizationHeader()
    });
  }

  getAllProductByName(name: string) {
    return this.http.get<Array<any>>(this.BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  addToCart(productId: number) {
    const cardDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };

    return this.http.post<Array<any>>(this.BASIC_URL + 'api/customer/cart', cardDto, { 
      headers: this.createAuthorizationHeader()
    });
  }

  getCartByUserId() {
    const userId = UserStorageService.getUserId();
    return this.http.get(this.BASIC_URL + `api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }
}
