import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { direcciones } from '../Models/direccionesModel';

@Injectable({
  providedIn: 'root'
})
export class RequestServicesService {
  private urlEndPoint = environment.APIEndpoint;
  constructor(
    private http: HttpClient,
  ) { }

  gets(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}`)
  }
  get(id:number): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${id}`)
  }
  post(data: direcciones): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(`${this.urlEndPoint}`, data,{ headers, responseType: 'text' as 'json' });
  }
  put(id:number,data: direcciones): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>(`${this.urlEndPoint}${id}`, data,{ headers, responseType: 'text' as 'json' });
  }
  delete(id:number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.delete<any>(`${this.urlEndPoint}${id}`,{ headers, responseType: 'text' as 'json' });
  }


 



}
