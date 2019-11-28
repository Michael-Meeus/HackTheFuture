import { Component, OnInit, Input } from '@angular/core';
import { Bank } from '../models/Bank.model';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.css']
})
export class BankCardComponent implements OnInit {
  @Input() bank: Bank;

  constructor() { }

  ngOnInit() {
  }

}
