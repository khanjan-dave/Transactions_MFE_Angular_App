import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TransactionService } from '../../core/services/transaction.service';
import { TransactionsActions } from './transactions.actions';

@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
  private transactionService = inject(TransactionService);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      exhaustMap(() =>
        this.transactionService.getMyTransactions().pipe(
          map((response) =>
            TransactionsActions.loadTransactionsSuccess({ transactions: response.transactions }),
          ),
          catchError((error) =>
            of(
              TransactionsActions.loadTransactionsFailure({
                error: error?.error?.message || 'Failed to load transactions',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransaction),
      exhaustMap(({ request }) =>
        this.transactionService.createTransaction(request).pipe(
          map((transaction) => TransactionsActions.createTransactionSuccess({ transaction })),
          catchError((error) =>
            of(
              TransactionsActions.createTransactionFailure({
                error: error?.error?.message || 'Transaction failed. Please try again.',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
