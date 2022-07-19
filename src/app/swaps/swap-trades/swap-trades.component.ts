import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() isSwapCompleted!: boolean;

  @Output() isTradeSelected = new EventEmitter<boolean>();
  @Output() offerAcceptedFromTradesEmitter = new EventEmitter<any>();

  swapIncludesPendingOffers: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.swapIncludesPendingOffers = this.tradeOffers.filter(offer => offer.status.pending).length > 0;
  }
  onSelectTradeOffer(event: any): void {
    if(event.target!.tagName === 'TD' && event.target.parentElement.tagName === 'TR') {
      this.isTradeSelected.emit(event);
    }
  }

  onTradeOfferAccepted(event: any): void {
    const isAccepted = confirm('Confirm accepting selected trade offer. This operation will decline all other existing offers.');

    if(isAccepted) {
      this.offerAcceptedFromTradesEmitter.emit(event);
    }
  }

}
