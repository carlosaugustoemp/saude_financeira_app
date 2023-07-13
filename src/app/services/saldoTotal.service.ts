import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { DespesaPorConta } from '../models/despesaPorConta';



@Injectable({
  providedIn: 'root'
})
export class SaldoTotalService {

  constructor(private http: HttpClient) { }

  findSaldoTotal(inicio: string, final: string): Observable<DespesaPorConta[]> {
    return this.http.get<DespesaPorConta[]>(`${API_CONFIG.baseUrl}/saldototal?dtinicio=${inicio}&dtfinal=${final}`);
  }
}
