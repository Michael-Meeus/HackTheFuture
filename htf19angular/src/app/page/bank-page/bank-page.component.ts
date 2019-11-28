import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/Bank.model';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-bank-page',
  templateUrl: './bank-page.component.html',
  styleUrls: ['./bank-page.component.css']
})
export class BankPageComponent implements OnInit {
  banks: Bank[];
  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.bankService.getAllBanks().subscribe({
        next: (data) => {
          console.log(JSON.stringify(data));
          this.banks = data;
    },
    error: err => this.handleError(err)});
  }
  handleError(err: any): void {
  console.error(err);
  }

}
