import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrades } from 'src/app/shared/interfaces/trades';

@Component({
  selector: 'app-swap-trades',
  templateUrl: './swap-trades.component.html',
  styleUrls: ['./swap-trades.component.scss']
})
export class SwapTradesComponent implements OnInit {

  // @Input() swap$!: Observable<ISwap>
  @Input() tradeOffers!: ITrades[]

  constructor() { }

  ngOnInit(): void {
    // this.swap$.subscribe((trade) => console.log(trade));
    console.log(this.tradeOffers);
  }

}
