import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image-service';
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
  @Input() swapId!: string;
  @Input() tradeOwnerId!: string;

  tradeImages!: string[];
  tradeOffer!: ITrades;

  constructor( 
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.tradeOffer = this.tradeOffers.filter(offer => offer.user === this.loggedInUser._id).pop()!;
    this.imageService.getTradeImages(this.swapId, this.tradeOffer.user).then((links) => this.tradeImages = links);
  }

}
