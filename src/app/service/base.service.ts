import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<Request, Response> {

  constructor(private http: HttpClient) {}

  get(url: string): Observable<Response>  {
    return this.http.get<Response>(url);
  }

  post(url: string, body: Request): Observable<Response>  {
    return this.http.post<Response>(url, body);
  }

  put(url: string, body: Request): Observable<Response>  {
    return this.http.put<Response>(url, body);
  }

}
