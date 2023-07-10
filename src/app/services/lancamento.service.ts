import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Lancamento } from '../models/lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Lancamento> {
    console.log("Lancamento find by");
    console.log(id);

    return this.http.get<Lancamento>(`${API_CONFIG.baseUrl}/lancamentos/${id}`);
  }

  findAll(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(`${API_CONFIG.baseUrl}/lancamentos`);
  }

  create(lancamento: Lancamento): Observable<Lancamento> {
    console.log("Lancamento enviado");
    console.log(lancamento);
    return this.http.post<Lancamento>(`${API_CONFIG.baseUrl}/lancamentos`, lancamento);
  }

  update(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${API_CONFIG.baseUrl}/lancamentos/${lancamento.id}`, lancamento);
  }

  delete(id: any): Observable<Lancamento> {
    return this.http.delete<Lancamento>(`${API_CONFIG.baseUrl}/lancamentos/${id}`);
  }

}
