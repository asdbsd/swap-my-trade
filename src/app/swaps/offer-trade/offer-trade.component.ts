import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { currentErrorSelector } from 'src/app/+store/selectors';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-offer-trade',
  templateUrl: './offer-trade.component.html',
  styleUrls: ['./offer-trade.component.scss']
})
export class OfferTradeComponent implements OnInit {

  @Input() swapOwnerId!: string;
  swapOwnerTrades$!: Observable<string[]>;

  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private userService: UserService,
    private tradeService: TradeService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.swapOwnerTrades$ = combineLatest([
      this.userService.getProfileById(this.swapOwnerId),
      this.tradeService.getTrades()
    ]).pipe(
      map(([profile, trades]) => {
        profile.myTrades = trades.filter(trade => profile.myTrades.includes(trade._id)).map(trade => trade.name);
        return profile.myTrades;
      })
    )
  }

  onTradeSubmit(form: NgForm, event$: Event): void {
    console.log(form);
    console.log(event$);
  }

  onImgUpload(event$: Event): void {
    console.log(event$);
  }

}
