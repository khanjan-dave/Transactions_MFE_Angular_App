export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Transaction {
  transactionReference: string;
  transactionType: TransactionType;
  amount: number;
  status: TransactionStatus;
  senderUsername: string;
  receiverUsername?: string;
  fraudScore: number;
  riskLevel: RiskLevel;
  initiatedAt: string;
  description?: string;
}

export interface CreateTransactionRequest {
  transactionType: TransactionType;
  amount: number;
  senderAccountNumber: string;
  receiverAccountNumber?: string;
  receiverUsername?: string;
  description?: string;
  idempotencyKey: string;
}

export interface TransactionListResponse {
  count: number;
  transactions: Transaction[];
}
