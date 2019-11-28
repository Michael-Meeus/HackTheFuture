import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//components
import { BankCardComponent } from './bank-card/bank-card.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BankPageComponent} from './page/bank-page/bank-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';

//services
import { BankService } from './services/bank.service';
import { TransactionService } from './services/transaction.service';

import { AccountService } from './services/account.service';

@NgModule({
  declarations: [
    AppComponent,
    BankCardComponent,
    BankPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [BankService, AccountService, TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
