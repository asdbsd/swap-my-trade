import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrade } from 'src/app/shared/interfaces/trades';
import { TradeService } from 'src/app/trades/trade.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swaps',
  templateUrl: './swaps.component.html',
  styleUrls: ['./swaps.component.scss']
})
export class SwapsComponent implements OnInit, OnDestroy {
  
  subscription!: Subscription;
  swaps!: ISwap[]
  trades!: ITrade[]


  constructor(
    private swapsService: SwapService,
    private tradeService: TradeService
  ) { }

  ngOnInit(): void {
    this.subscription = this.swapsService.getSwaps().pipe(
      switchMap((swaps: ISwap[]) => {
        this.swaps = swaps;
        return this.tradeService.getTrades();
      })
    ).subscribe((trades: ITrade[]) => {
      trades.map((trade: ITrade) => {
        this.swaps.map(swap => swap.trade == trade._id ? swap.trade = trade.name : null)
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
