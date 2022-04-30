import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { currentUserSelector } from 'src/app/+store/selectors';
import { IProfile } from 'src/app/shared/interfaces/profiles';

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
  currentUserSubscrption!: Subscription;


  swaps!: ISwap[]
  trades!: ITrade[]
  currentUser!: IProfile | null;


  constructor(
    private swapsService: SwapService,
    private tradeService: TradeService,
    private store: Store<any>
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


    this.currentUserSubscrption = this.store.select(currentUserSelector).subscribe((user) => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.currentUserSubscrption.unsubscribe();
    
  }

  deleteSwap(swap: ISwap) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.swapsService.deleteSwap(swap).then(() => 
       console.log('delete successful'));
    }
  }

}
