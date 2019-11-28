import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankPageComponent } from './page/bank-page/bank-page.component';


const routes: Routes = [ { path: 'banks', component: BankPageComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
