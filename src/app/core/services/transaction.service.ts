import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  Transaction,
  CreateTransactionRequest,
  TransactionListResponse,
} from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private http = inject(HttpClient);
  private baseUrl = environment.transactionApiUrl;

  createTransaction(request: CreateTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/api/transactions/create`, request);
  }

  getMyTransactions(): Observable<TransactionListResponse> {
    return this.http.get<TransactionListResponse>(
      `${this.baseUrl}/api/transactions/my-transactions`,
    );
  }
}
