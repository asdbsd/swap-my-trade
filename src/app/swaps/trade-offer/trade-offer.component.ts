import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITrades } from 'src/app/shared/interfaces/trades';

@Component({
  selector: 'app-trade-offer',
  templateUrl: './trade-offer.component.html',
  styleUrls: ['./trade-offer.component.scss']
})
export class TradeOfferComponent implements OnInit, OnChanges {

  @Input() tradeOffer!: ITrades;
  @Input() tradeImages!: string[];
  @Input() isSwapCompleted!: boolean;
  @Input() isSwapOwner!: boolean;

  @Output() offerAcceptedEmiter = new EventEmitter<any>()
  @Output() offerDeclinedEmitter = new EventEmitter<any>();

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

  onTradeOfferDeclined(event: any): void {
    const isAccepted = confirm('Confirm declining selected trade offer. You won\'t be able to revert back this operation.');
    console.log(this.isTradeOfferPending);

    if(isAccepted) {
      this.offerDeclinedEmitter.emit(event);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['tradeOffer'].currentValue.status.declined === true) {
      this.isTradeOfferPending = this.tradeOffer.status.pending;
    }
  }

}
