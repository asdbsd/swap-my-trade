import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image-service';
import { ITrades } from 'src/app/shared/interfaces/trades';

@Component({
  selector: 'app-trade-offer',
  templateUrl: './trade-offer.component.html',
  styleUrls: ['./trade-offer.component.scss']
})
export class TradeOfferComponent implements OnInit {

  @Input() tradeOffer!: ITrades;
  @Input() tradeImages!: string[];
  @Input() isLoggedIn!: boolean;


  constructor( 
    private imageService: ImageService
  ) { }

  ngOnInit(): void {

  }

}
