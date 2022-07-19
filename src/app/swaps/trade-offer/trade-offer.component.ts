import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ITrades } from 'src/app/shared/interfaces/trades';

@Component({
  selector: 'app-trade-offer',
  templateUrl: './trade-offer.component.html',
  styleUrls: ['./trade-offer.component.scss']
})
export class TradeOfferComponent implements OnInit {

  @Input() tradeOffer!: ITrades;
  @Input() tradeImages!: string[];
  @Input() isSwapCompleted!: boolean;
  @Input() isSwapOwner!: boolean;

  @Output() offerAcceptedEmiter = new EventEmitter<any>()

  isTradeOfferPending: boolean = false;


  constructor( ) { }

  ngOnInit(): void {
    this.isTradeOfferPending = this.tradeOffer.status.pending;
  }

  onTradeOfferAccepted(event: any): void {
    const isAccepted = confirm('Confirm accepting selected trade offer. This operation will decline all other existing offers.');

    if(isAccepted) {
      this.offerAcceptedEmiter.emit(event);
    }
  }

}
