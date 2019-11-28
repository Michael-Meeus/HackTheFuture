export class Transaction {
    id: string;
// senderIban?: string;
// recieverIban?: string;
sender: string;
recipient: string;
// originAccount?: string;
// destinationAccount?: string;
amount: number
currency?: string;
time: string;
message: string;
}