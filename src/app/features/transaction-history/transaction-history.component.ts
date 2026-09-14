import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../core/models/transaction.model';
import {
  selectAllTransactions,
  selectTransactionsLoading,
} from '../../store/transactions/transactions.selectors';
import { TransactionsActions } from '../../store/transactions/transactions.actions';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  transactions$: Observable<Transaction[]> = this.store.select(selectAllTransactions);
  loading$: Observable<boolean> = this.store.select(selectTransactionsLoading);

  ngOnInit(): void {
    this.store.dispatch(TransactionsActions.loadTransactions());
  }

  goToCreateTransaction(): void {
    this.router.navigate(['/transactions/new']);
  }

  goBackToDashboard(): void {
    // Shell-level navigation back into Account MFE
    this.router.navigate(['/dashboard']);
  }

  riskBadgeClass(risk: string): string {
    return `risk-badge risk-badge--${risk.toLowerCase()}`;
  }

  statusBadgeClass(status: string): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
