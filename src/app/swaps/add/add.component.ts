import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ITrade } from 'src/app/shared/interfaces/swaps';
import { TradeService } from 'src/app/trades/trade.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  tradeSubscribtion!: Subscription;
  trades$: Observable<ITrade[]> = this.tradeService.getTrades();

  trades!: ITrade[];

  constructor(
    private tradeService: TradeService
  ) { }


  ngOnInit() {
    this.tradeSubscribtion = this.trades$.subscribe((trades) => this.trades = trades)
  }

  ngOnDestroy(): void {
    this.tradeSubscribtion.unsubscribe();
  }


  async onCreateSwap(form: NgForm): Promise<void> {
    console.log(form);
  }



}
