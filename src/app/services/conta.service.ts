import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Conta> {
    return this.http.get<Conta>(`${API_CONFIG.baseUrl}/contas/${id}`);
  }

  findAll(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${API_CONFIG.baseUrl}/contas`);
  }

   create(conta: Conta): Observable<Conta> {
    console.log("Servico conta")
    console.log(conta)
     return this.http.post<Conta>(`${API_CONFIG.baseUrl}/contas`, conta);
   }

  update(conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${API_CONFIG.baseUrl}/contas/${conta.id}`, conta);
  }

  delete(id: any): Observable<Conta> {
    return this.http.delete<Conta>(`${API_CONFIG.baseUrl}/contas/${id}`);
  }
}
