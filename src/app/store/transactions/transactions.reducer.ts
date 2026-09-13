import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../core/models/transaction.model';
import { TransactionsActions } from './transactions.actions';

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  creating: boolean;
  error: string | null;
  lastCreated: Transaction | null;
}

export const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  creating: false,
  error: null,
  lastCreated: null,
};

export const transactionsReducer = createReducer(
  initialState,

  on(TransactionsActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
  })),

  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionsActions.createTransaction, (state) => ({
    ...state,
    creating: true,
    error: null,
    lastCreated: null,
  })),

  on(TransactionsActions.createTransactionSuccess, (state, { transaction }) => ({
    ...state,
    creating: false,
    lastCreated: transaction,
    transactions: [transaction, ...state.transactions],
  })),

  on(TransactionsActions.createTransactionFailure, (state, { error }) => ({
    ...state,
    creating: false,
    error,
  })),

  on(TransactionsActions.clearTransactionError, (state) => ({
    ...state,
    error: null,
  })),
);
