import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { addError, clearError } from 'src/app/+store/actions';
import { currentErrorSelector } from 'src/app/+store/selectors';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-offer-trade',
  templateUrl: './offer-trade.component.html',
  styleUrls: ['./offer-trade.component.scss']
})
export class OfferTradeComponent implements OnInit {

  @Input() swap!: ISwap;
  swapOwnerTrades$!: Observable<string[]>;
  currrentImagesToUpload!: any[];

  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private userService: UserService,
    private tradeService: TradeService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.swapOwnerTrades$ = combineLatest([
      this.userService.getProfileById(this.swap._ownerId),
      this.tradeService.getTrades()
    ]).pipe(
      map(([profile, trades]) => {
        profile.myTrades = trades.filter(trade => profile.myTrades.includes(trade._id)).map(trade => trade.name);
        return profile.myTrades;
      })
    )
  }

  async onTradeSubmit(form: NgForm, event$: Event): Promise<void> {
    if (form.invalid) { return; }

    const myTrades = [];
    for (let [k, v] of Object.entries(form.value)) { v === true ? myTrades.push(k) : null; }

    if (myTrades.length < 1) {
      this.store.dispatch(addError({ error: 'At least one trade must be selected.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    };

    const combinedAddress = form.value.address + ', ' + form.value.address2;

    // this.swap.tradeOffers.push({
    //   status: {
    //     accepted: false,
    //     pending: true,
    //     declined: false
    //   },
    //   tradeStartDate: form.value.tradeStartDate,
    //   tradeEndDate: form.value.tradeEndDate,
    //   tradesRequested: myTrades,
    //   address: combinedAddress,
    //   notes: form.value.additionalNotes,
    //   user: this.currentUser!._id
    // });

    // await this.swapService.partialSwapUpdate(
    //   this.swap._id,
    //   this.swap.swapOffers,
    //   this.swap.tradeOffers
    // );


    // this.router.navigate([`/swaps/${this.swap._id}`]);


    console.log(form);
    console.log(event$);
  }

  async onImgUpload(event$: any): Promise<void> {
    const files: File[] = Array.from(event$.target.files);
    if (files.length) { this.currrentImagesToUpload = files };
    console.log(this.currrentImagesToUpload);
    return;
  }

}
