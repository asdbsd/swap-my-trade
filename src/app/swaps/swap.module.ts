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
import { SwapTradesComponent } from './swap-trades/swap-trades.component';
import { SwapOwnerComponent } from './swap-owner/swap-owner.component';
import { SwapImagesComponent } from './swap-images/swap-images.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { OfferTradeComponent } from './offer-trade/offer-trade.component';
import { TradeOfferComponent } from './trade-offer/trade-offer.component';
// import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SwapsComponent,
    MySwapsComponent,
    SwapDetailsComponent,
    AddComponent,
    SwapTradesComponent,
    SwapOwnerComponent,
    SwapImagesComponent,
    LoginOrRegisterComponent,
    OfferTradeComponent,
    TradeOfferComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SwapsRoutingModule
  ],
  providers: [
    SwapService,
    TradeService,
    UserService
  ]
})
export class SwapModule { }
