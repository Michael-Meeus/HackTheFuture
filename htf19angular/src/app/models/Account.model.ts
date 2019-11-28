import { Transaction } from './Transaction.model';

export interface Account {
  id: string;
  name: string;
  country: string;
  gender: string;
  nationality?: string;
  birthday: string;
  login: {
    username: string;
    hashedPassword: string;
  };
  card: {
    id: string;
    iban: string;
    date: string;
    balance: number;
    currency?: string;
    transactions: Transaction[];
  };
}
