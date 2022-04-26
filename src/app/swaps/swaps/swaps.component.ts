import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, switchMap } from 'rxjs';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrade } from 'src/app/shared/interfaces/trades';
import { TradeService } from 'src/app/trades/trade.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swaps',
  templateUrl: './swaps.component.html',
  styleUrls: ['./swaps.component.scss']
})
export class SwapsComponent implements OnInit {
  

  swaps$!: Observable<ISwap[]>
  trades$!: Observable<ITrade[]>


  constructor(
    private swapsService: SwapService,
    private tradeService: TradeService
  ) { }

  ngOnInit(): void {
    this.swaps$ = this.swapsService.getSwaps();
    this.trades$ = this.tradeService.getTrades();
  }

}
