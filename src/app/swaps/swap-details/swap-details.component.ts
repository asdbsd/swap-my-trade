import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrade } from 'src/app/shared/interfaces/trades';
import { TradeService } from 'src/app/trades/trade.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swap-details',
  templateUrl: './swap-details.component.html',
  styleUrls: ['./swap-details.component.scss']
})
export class SwapDetailsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  swap!: ISwap
  trade!: ITrade
  constructor(
    private swapService: SwapService,
    private tradeService: TradeService,
    private activatedRoute: ActivatedRoute
  ) { }

  swap$!: Observable<ISwap>

  ngOnInit(): void {
    this.subscription = this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']).pipe(
      switchMap((swap: ISwap) => {
        this.swap = swap;
        return this.tradeService.getTradeById(swap.trade)
      })
    ).subscribe((trade: ITrade) => this.swap.trade = trade.name)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
