import {Account} from "./Account.model";
import {Transaction} from "./Transaction.model";

export class Bank {
  id: number;
  name: string;
  difficulty: number;
  api: string;
  accounts: Account[];
  transactions: Transaction[];
}
