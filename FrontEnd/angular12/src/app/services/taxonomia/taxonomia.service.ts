import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Taxonomia } from "../../models/taxonomia/taxonomia.model";

const baseUrl = 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class TaxonomiaService {

  constructor(private http: HttpClient) { }

  get(especie: any): Observable<Taxonomia> {
    return this.http.get(`${baseUrl}/taxonomia/${especie}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/taxonomia`,data)
  }

  update(especie: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/taxonomia/${especie}`, data);
  }

  delete(especie: any): Observable<any> {
    return this.http.delete(`${baseUrl}/taxonomia/${especie}`);
  }
}
