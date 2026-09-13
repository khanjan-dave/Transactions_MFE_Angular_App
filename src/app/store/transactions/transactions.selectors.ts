import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.reducer';

export const selectTransactionsState = createFeatureSelector<TransactionsState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactionsState,
  (state) => state.transactions,
);

export const selectTransactionsLoading = createSelector(
  selectTransactionsState,
  (state) => state.loading,
);

export const selectTransactionCreating = createSelector(
  selectTransactionsState,
  (state) => state.creating,
);

export const selectTransactionError = createSelector(
  selectTransactionsState,
  (state) => state.error,
);

export const selectLastCreatedTransaction = createSelector(
  selectTransactionsState,
  (state) => state.lastCreated,
);
