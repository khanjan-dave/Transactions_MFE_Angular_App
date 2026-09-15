import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TransactionHistoryComponent } from './features/transaction-history/transaction-history.component';
import { CreateTransactionComponent } from './features/create-transaction/create-transaction.component';
import { authGuard } from './core/guards/auth.guard';
import { transactionsReducer } from './store/transactions/transactions.reducer';
import { TransactionsEffects } from './store/transactions/transactions.effects';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideState('transactions', transactionsReducer),
      provideEffects([TransactionsEffects]),
    ],
    children: [
      { path: '', component: TransactionHistoryComponent, canActivate: [authGuard] },
      { path: 'new', component: CreateTransactionComponent, canActivate: [authGuard] },
    ],
  },
];
