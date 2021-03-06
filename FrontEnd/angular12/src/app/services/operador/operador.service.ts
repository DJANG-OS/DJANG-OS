import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Operador } from '../../models/operador/operador.model';

const baseUrl = 'http://34.139.8.186:8080'
@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Operador[]> {
    return this.http.get<Operador[]>(baseUrl);
  }

  get(ci: any): Observable<Operador> {
    return this.http.get(`${baseUrl}/operador/${ci}`);
  }

  findByEmail(email: any): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${baseUrl}/login?email=${email}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin`,data)
  }

  update(ci: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/operador/${ci}`, data);
  }

  delete(ci: any): Observable<any> {
    return this.http.delete(`${baseUrl}/operador/${ci}`);
  }
}
