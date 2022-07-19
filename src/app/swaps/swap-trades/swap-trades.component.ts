import { Component, Input, OnInit, Output } from '@angular/core';
import { ITrades } from 'src/app/shared/interfaces/trades';
import { UserService } from 'src/app/users/user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-swap-trades',
  templateUrl: './swap-trades.component.html',
  styleUrls: ['./swap-trades.component.scss']
})
export class SwapTradesComponent implements OnInit {

  @Input() tradeOffers!: ITrades[];
  @Input() isTradeOfferSelected!: boolean;
  @Input() swapHasAcceptedTrade!: boolean;

  @Output() isTradeSelected = new EventEmitter<boolean>();
  @Output() offerAcceptedFromTradesEmitter = new EventEmitter<any>();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  onSelectTradeOffer(event: any): void {
    if(event.target!.tagName === 'TD' && event.target.parentElement.tagName === 'TR') {
      this.isTradeSelected.emit(event);
    }
  }

  onTradeOfferAccepted(event: any): void {
    const isAccepted = confirm('Confirm accepting selected trade offer. This operation will decline all other existing offers.');
    console.log(isAccepted);

    if(isAccepted) {
      this.offerAcceptedFromTradesEmitter.emit(event);
    }
  }

}
