import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Transaction } from "../models/Transaction.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  private banksUrl = `https://htf.zinderlabs.com/`;
  private fix = "transactions";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "a53bd0415947807bcb95ceec535820ee"
    })
  };

  constructor(private http: HttpClient) {}
  getAllTransactions(bankApi: string): Observable<Transaction[]> {
    const allUrl = `${this.banksUrl}${bankApi}${this.fix}`;
    return this.http.get<Transaction[]>(allUrl, this.httpOptions);
  }
}
