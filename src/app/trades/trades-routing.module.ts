import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTradeComponent } from './new-trade/new-trade.component';

const routes: Routes = [
  {
    path: 'new-trade',
    component: NewTradeComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradesRoutingModule { }
