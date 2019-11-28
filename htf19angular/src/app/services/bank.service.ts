import { Injectable } from '@angular/core';
import { Bank } from "../bank";
import { BANKS } from "./mock-banks";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private banksUrl = "banks"; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient
  ) {}

  /** GET banks from the server */
  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.banksUrl).pipe(
      catchError(this.handleError<Bank[]>("getBanks", []))
    );
  }

  /** GET bank by id. Will 404 if id not found */
  getBank(id: number): Observable<Bank> {
    const url = `${this.banksUrl}/${id}`;
    return this.http.get<Bank>(url).pipe(
      catchError(this.handleError<Bank>(`getBank id=${id}`))
    );

    // Different syntax for returning:
    // return of(BANKS.find(bank => bank.id === id));
  }

  /** GET banks whose name contains search term */
  searchBanks(term: string): Observable<Bank[]> {
    if (!term.trim()) {
      // if not search term, return empty bank array.
      return of([]);
    }

    return this.http.get<Bank[]>(`${this.banksUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Bank[]>('searchBanks', []))
    );
  }

  /** PUT: update the bank on the server */
  updateBank(bank: Bank): Observable<any> {
    return this.http.put(this.banksUrl, bank, this.httpOptions).pipe(
      catchError(this.handleError<any>("updateBank"))
    );
  }

  /** POST: add a new bank to the server */
  addBank(bank: Bank): Observable<Bank> {
    return this.http.post<Bank>(this.banksUrl, bank, this.httpOptions).pipe(
      catchError(this.handleError<Bank>("addBank"))
    );
  }

  /** DELETE: delete the bank from the server */
  deleteBank(bank: Bank | number): Observable<Bank> {
    const id = typeof bank === 'number' ? bank : bank.id;
    const url = `${this.banksUrl}/${id}`;

    return this.http.delete<Bank>(url, this.httpOptions).pipe(
      catchError(this.handleError<Bank>('deleteBank'))
    );
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
