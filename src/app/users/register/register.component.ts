import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ITrade } from 'src/app/shared/interfaces/trades';
import { TradeService } from 'src/app/trades/trade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  trades$: Observable<ITrade[]>

  constructor(
    private tradeService: TradeService
  ) {
    this.trades$ = this.tradeService.getTrades();
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {

  }



}
