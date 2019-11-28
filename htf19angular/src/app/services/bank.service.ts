import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bank } from '../models/Bank.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private banksUrl =  `https://htf.zinderlabs.com/`;
  private fix = 'banks';

  private httpOptions = {
    headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        Authorization: 'a53bd0415947807bcb95ceec535820ee'

    })
  };

  constructor(private http: HttpClient) { }
  getAllBanks(): Observable<Bank[]> {
   const allUrl =  `${this.banksUrl}${this.fix}`;
   return this.http.get<Bank[]>(allUrl);
  }

}
