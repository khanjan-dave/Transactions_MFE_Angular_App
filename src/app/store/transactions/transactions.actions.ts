import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction, CreateTransactionRequest } from '../../core/models/transaction.model';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Load Transactions': emptyProps(),
    'Load Transactions Success': props<{ transactions: Transaction[] }>(),
    'Load Transactions Failure': props<{ error: string }>(),

    'Create Transaction': props<{ request: CreateTransactionRequest }>(),
    'Create Transaction Success': props<{ transaction: Transaction }>(),
    'Create Transaction Failure': props<{ error: string }>(),

    'Clear Transaction Error': emptyProps(),
  },
});
