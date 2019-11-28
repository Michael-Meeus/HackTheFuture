import { Injectable } from "@angular/core";
import { Transaction } from "../models/Transaction.model";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Bank } from '../models/Bank.model';

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  private transactionsUrl = `https://htf.zinderlabs.com/${this.bank}/transactions`; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "67a716cee57c9d6bb862151753b3fc81"
    })
  };

  constructor(private http: HttpClient, private bank: Bank) {}

  /** GET transactions from the server */
  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.transactionsUrl)
      .pipe(catchError(this.handleError<Transaction[]>("getTransactions", [])));
  }

  /** GET transaction by id. Will 404 if id not found */
  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.transactionsUrl}/${id}`;
    return this.http
      .get<Transaction>(url)
      .pipe(
        catchError(this.handleError<Transaction>(`getTransaction id=${id}`))
      );

    // Different syntax for returning:
    // return of(BANKS.find(transaction => transaction.id === id));
  }

  /** GET transactions whose name contains search term */
  searchTransactions(term: string): Observable<Transaction[]> {
    if (!term.trim()) {
      // if not search term, return empty transaction array.
      return of([]);
    }

    return this.http
      .get<Transaction[]>(`${this.transactionsUrl}/?name=${term}`)
      .pipe(
        catchError(this.handleError<Transaction[]>("searchTransactions", []))
      );
  }

  /** PUT: update the transaction on the server */
  updateTransaction(transaction: Transaction): Observable<any> {
    return this.http
      .put(this.transactionsUrl, transaction, this.httpOptions)
      .pipe(catchError(this.handleError<any>("updateTransaction")));
  }

  /** POST: add a new transaction to the server */
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(this.transactionsUrl, transaction, this.httpOptions)
      .pipe(catchError(this.handleError<Transaction>("addTransaction")));
  }

  /** DELETE: delete the transaction from the server */
  deleteTransaction(
    transaction: Transaction | number
  ): Observable<Transaction> {
    const id = typeof transaction === "number" ? transaction : transaction.id;
    const url = `${this.transactionsUrl}/${id}`;

    return this.http
      .delete<Transaction>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Transaction>("deleteTransaction")));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
