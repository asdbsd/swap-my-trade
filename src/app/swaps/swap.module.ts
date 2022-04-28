import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapsComponent } from './swaps/swaps.component'; 
import { MySwapsComponent } from './my-swaps/my-swaps.component';
import { SwapDetailsComponent } from './swap-details/swap-details.component';
import { SwapsRoutingModule } from './swaps-routing.module';
import { AddComponent } from './add/add.component';
import { SwapService } from './swap.service';
import { FormsModule } from '@angular/forms';
import { TradeService } from '../trades/trade.service';
import { UserService } from '../users/user.service';



@NgModule({
  declarations: [
    SwapsComponent,
    MySwapsComponent,
    SwapDetailsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SwapsRoutingModule,
  ],
  providers: [
    SwapService,
    TradeService,
    UserService
  ]
})
export class SwapModule { }
