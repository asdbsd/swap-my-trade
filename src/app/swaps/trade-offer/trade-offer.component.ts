import { Component, Input, OnInit } from '@angular/core';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ITrades } from 'src/app/shared/interfaces/trades';

@Component({
  selector: 'app-trade-offer',
  templateUrl: './trade-offer.component.html',
  styleUrls: ['./trade-offer.component.scss']
})
export class TradeOfferComponent implements OnInit {

  @Input() tradeOffers!: ITrades[];
  @Input() loggedInUser!: IProfile;

  tradeOffer!: ITrades | undefined;

  constructor() { }

  ngOnInit(): void {
    // console.log('Offer: ', this.tradeOffers, '|', 'Id: ', this.loggedInUser._id);
    this.tradeOffer = this.tradeOffers.filter(offer => offer.user === this.loggedInUser._id).pop();
    console.log(this.tradeOffer?.status);
  }

}
