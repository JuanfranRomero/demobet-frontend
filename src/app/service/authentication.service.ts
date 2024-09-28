import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { LoginRequest } from '../model/login-request.model';
import { LoginResponse } from '../model/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService<LoginRequest, LoginResponse> {

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return super.post('http://localhost:1000/auth/generate_token', loginRequest);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
  }

}
