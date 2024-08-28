import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin');
  }

  addProduct(productDto:any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/products', productDto);
  }
  

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }
}
