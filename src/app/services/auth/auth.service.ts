import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private usService: UserStorageService) { }

  register(sinunupRequest: any) {
    return this.httpClient.post(BASIC_URL + 'signu-up', sinunupRequest);
  }

  login(userName: string, password: string) {
    const body = { userName, password };

    return this.httpClient.post(BASIC_URL + 'authenticate', body)
                          .pipe(map((res) => {
                            const httpRes = res as HttpResponse<unknown>;
                            const token = httpRes.headers.get('authorization')?.substring(7);
                            const user = httpRes.body;
                            if (token && user) {
                              this.usService.saveToken(token);
                              this.usService.saveUser(user);

                              return true;
                            }
                            
                            return false;
                          }));
  }
}
