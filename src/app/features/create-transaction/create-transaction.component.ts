import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransactionsActions } from '../../store/transactions/transactions.actions';
import {
  selectTransactionCreating,
  selectTransactionError,
} from '../../store/transactions/transactions.selectors';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss',
})
export class CreateTransactionComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  creating$: Observable<boolean> = this.store.select(selectTransactionCreating);
  error$: Observable<string | null> = this.store.select(selectTransactionError);

  transactionForm = this.fb.group({
    transactionType: ['TRANSFER', Validators.required],
    senderAccountNumber: ['', Validators.required],
    receiverAccountNumber: [''],
    receiverUsername: [''],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    description: [''],
  });

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const formValue = this.transactionForm.getRawValue();
    const idempotencyKey = `txn-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    this.store.dispatch(
      TransactionsActions.createTransaction({
        request: {
          transactionType: formValue.transactionType as 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER',
          amount: formValue.amount!,
          senderAccountNumber: formValue.senderAccountNumber!,
          receiverAccountNumber: formValue.receiverAccountNumber || undefined,
          receiverUsername: formValue.receiverUsername || undefined,
          description: formValue.description || undefined,
          idempotencyKey,
        },
      }),
    );
  }

  cancel(): void {
    this.router.navigate(['/transactions']);
  }
}
