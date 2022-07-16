import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, map, Observable, of, switchMap, zip } from 'rxjs';
import { ImageService } from 'src/app/shared/image-service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-swap-owner',
  templateUrl: './swap-owner.component.html',
  styleUrls: ['./swap-owner.component.scss']
})
export class SwapOwnerComponent implements OnInit {

  @Input() swap!: ISwap;
  swapImagesLinks!: string[];
  
  currentSwapOwner$!: Observable<IProfile>;

  constructor(
    private userService: UserService,
    private tradeService: TradeService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.currentSwapOwner$ = combineLatest([
      this.userService.getProfileById(this.swap._ownerId),
      this.tradeService.getTrades()
    ]).pipe(
      map(([profile, trades]) => {
        profile.myTrades = trades.filter(trade => profile.myTrades.includes(trade._id)).map(trade => trade.name);
        return profile;
      })
    )

    this.imageService.getSwapImages(this.swap._id).then((links) => this.swapImagesLinks = links);

  }

}