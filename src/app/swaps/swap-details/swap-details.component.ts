import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListResult, StorageReference, getDownloadURL } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ImageServiceService } from 'src/app/shared/image-service.service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrade } from 'src/app/shared/interfaces/trades';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swap-details',
  templateUrl: './swap-details.component.html',
  styleUrls: ['./swap-details.component.scss']
})
export class SwapDetailsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  swap!: ISwap;
  trade!: ITrade;
  profile!: IProfile;
  trades!: string[];
  images!: any[];



  constructor(
    private swapService: SwapService,
    private tradeService: TradeService,
    private activatedRoute: ActivatedRoute,
    private imageStorage: ImageServiceService,
    private userService: UserService
  ) { }

  swap$!: Observable<ISwap>

  async ngOnInit(): Promise<any> {

    this.subscription = this.swapService.getSwapById(this.activatedRoute.snapshot.params['id'])
      .pipe(
        // Get current swap
        switchMap((swap: ISwap) => {
          this.swap = swap;
          // Get current profile
          return this.userService.getProfileById(this.swap._ownerId);
        })
      ).pipe(
        switchMap((profile) => {
          this.profile = profile;
          return this.tradeService.getTrades()
        })).subscribe((trades: ITrade[]) => {
          for (let i = 0; i < trades.length; i++) {
            if (trades[i]._id === this.swap.trade) {
              this.swap.trade = trades[i].name
            }
            for (let y = 0; y < this.profile.myTrades.length; y++) {
              if (trades[i]._id === this.profile.myTrades[y]) { this.profile.myTrades[y] = trades[i].name }
            }
          }
        });

    // Get current swap images
    try {
      this.images = await this.imageStorage.getSwapImages(this.activatedRoute.snapshot.params['id']);
    } catch (err) {
      console.log(err);
    }


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
