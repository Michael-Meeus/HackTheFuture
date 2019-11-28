import { Injectable } from "@angular/core";
import { Account } from "../models/Account.model";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Bank } from '../models/Bank.model';

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private accountsUrl = `https://htf.zinderlabs.com/${this.bank}/accounts`; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "67a716cee57c9d6bb862151753b3fc81"
    })
  };

  constructor(private http: HttpClient, private bank: Bank) {}

  /** GET accounts from the server */
  getAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(this.accountsUrl)
      .pipe(catchError(this.handleError<Account[]>("getAccounts", [])));
  }

  /** GET account by id. Will 404 if id not found */
  getAccount(id: number): Observable<Account> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http
      .get<Account>(url)
      .pipe(catchError(this.handleError<Account>(`getAccount id=${id}`)));

    // Different syntax for returning:
    // return of(BANKS.find(account => account.id === id));
  }

  /** GET accounts whose name contains search term */
  searchAccounts(term: string): Observable<Account[]> {
    if (!term.trim()) {
      // if not search term, return empty account array.
      return of([]);
    }

    return this.http
      .get<Account[]>(`${this.accountsUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Account[]>("searchAccounts", [])));
  }

  /** PUT: update the account on the server */
  updateAccount(account: Account): Observable<any> {
    return this.http
      .put(this.accountsUrl, account, this.httpOptions)
      .pipe(catchError(this.handleError<any>("updateAccount")));
  }

  /** POST: add a new account to the server */
  addAccount(account: Account): Observable<Account> {
    return this.http
      .post<Account>(this.accountsUrl, account, this.httpOptions)
      .pipe(catchError(this.handleError<Account>("addAccount")));
  }

  /** DELETE: delete the account from the server */
  deleteAccount(account: Account | number): Observable<Account> {
    const id = typeof account === "number" ? account : account.id;
    const url = `${this.accountsUrl}/${id}`;

    return this.http
      .delete<Account>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Account>("deleteAccount")));
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
