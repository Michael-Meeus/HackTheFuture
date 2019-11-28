import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../models/Bank.model';

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private banksUrl = `https://htf.zinderlabs.com/`;
  private bank = ``;
  private fix = "accounts";

  private httpOptions = {
    headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        Authorization: 'a53bd0415947807bcb95ceec535820ee'

    })
  };

  constructor(private http: HttpClient) {}
  getAllAccounts(bankApi: string): Observable<Account[]> {
    const allUrl = `${this.banksUrl}${bankApi}${this.fix}`;
    return this.http.get<Account[]>(allUrl, this.httpOptions);
  }
}
