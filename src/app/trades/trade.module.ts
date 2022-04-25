import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTradeComponent } from './new-trade/new-trade.component';
import { TradesRoutingModule } from './trades-routing.module';
import { FormsModule } from '@angular/forms';
import { TradeService } from './trade.service';



@NgModule({
  declarations: [
    NewTradeComponent
  ],
  imports: [
    CommonModule,
    TradesRoutingModule,
    FormsModule
  ],
  providers: [ TradeService ]
})
export class TradeModule { }
