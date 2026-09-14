import { Routes } from '@angular/router';
import { TransactionHistoryComponent } from './features/transaction-history/transaction-history.component';
import { CreateTransactionComponent } from './features/create-transaction/create-transaction.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: TransactionHistoryComponent, canActivate: [authGuard] },
  { path: 'new', component: CreateTransactionComponent, canActivate: [authGuard] },
];
