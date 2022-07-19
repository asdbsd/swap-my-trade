import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { currentErrorSelector, currentUserSelector } from 'src/app/+store/selectors';
import { ImageService } from 'src/app/shared/image-service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrades } from 'src/app/shared/interfaces/trades';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swap-details',
  templateUrl: './swap-details.component.html',
  styleUrls: ['./swap-details.component.scss']
})
export class SwapDetailsComponent implements OnInit, OnDestroy {

  isTradeOwnerSubscription!: Subscription;
  tradeOfferSubscription!: Subscription;
  swapSubscription!: Subscription;

  swap$!: Observable<ISwap>;
  loggedInUser$: Observable<IProfile | null> = this.store.select(currentUserSelector);
  tradeOfferToDisplay$!: Observable<ITrades>;

  tradeImages!: string[];
  previousTradeEvent!: any;

  isTradeSelected: boolean = false;
  isTradeOwner: boolean = false;
  isSwapOwner: boolean = false;
  isSwapCompleted: boolean = false;

  formImages: any[] = [];

  uploading: number = 0;
  isUploading: boolean = false;

  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private swapService: SwapService,
    private tradeService: TradeService,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private imageService: ImageService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.swap$ = combineLatest([
      this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']),
      this.tradeService.getTrades(),
      this.loggedInUser$
    ]).pipe(
      switchMap(([swap, trades, loggedInUser]) => {
        swap._ownerId === loggedInUser?._id ? this.isSwapOwner = true : this.isSwapOwner = false;
        this.isSwapCompleted = swap.status.completed ? true : false
        trades.forEach(trade => trade._id === swap.trade ? swap.trade = trade.name : null);
        return of(swap);
      })
    );

    this.isTradeOwnerSubscription = combineLatest([
      this.loggedInUser$,
      this.swap$
    ]).subscribe(([loggedInUser, swap]) => swap.tradeOffers.forEach(offer => offer.user._id === loggedInUser?._id ? this.isTradeOwner = true : null));

    this.tradeOfferToDisplay$ = combineLatest([
      this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']),
      this.loggedInUser$
    ]).pipe(
      map(([swap, loggedInUser]) => {
        return swap.tradeOffers.filter(offer => offer.user._id === loggedInUser?._id).pop()!;
      })
    );

    this.tradeOfferSubscription = combineLatest([this.swap$, this.tradeOfferToDisplay$]).subscribe(([swap, offer]) => {
      if (offer) {
        this.imageService.getTradeImages(swap._id, offer.user._id).then((links) => this.tradeImages = links);
      }
    });

  }

  ngOnDestroy(): void {
    this.isTradeOwnerSubscription.unsubscribe();
    this.tradeOfferSubscription.unsubscribe();
  }

  onTradeSelected(event: any) {
    if (this.previousTradeEvent && (event.target.parentElement.id === this.previousTradeEvent.target.parentElement.id)) {
      if (this.isTradeSelected) {
        event.target.parentElement.style.backgroundColor = '';
      } else {
        event.target.parentElement.style.backgroundColor = '#FFF2CC';
      }
      this.isTradeSelected = !this.isTradeSelected;

    } else {
      this.isTradeSelected = true;
      event.target.parentElement.style.backgroundColor = '#FFF2CC'
      if (this.previousTradeEvent) {
        this.previousTradeEvent.target.parentElement.style.backgroundColor = ''

      }

    }

    this.previousTradeEvent = event;

    this.tradeOfferToDisplay$ = this.swap$.pipe(
      switchMap((swap) => of(swap.tradeOffers.filter(offer => offer.user._id === event.target.parentElement.id).pop()!))
    )

    this.tradeOfferSubscription = combineLatest([this.swap$, this.tradeOfferToDisplay$]).subscribe(([swap, offer]) => {
      this.imageService.getTradeImages(swap._id, offer.user._id).then((links) => this.tradeImages = links);
    })

  }

  onTradeAccepted(event: any): void {
    let swapAndTradeOwnerProfile: Observable<[ISwap, IProfile]> = combineLatest([this.swap$, this.userService.getProfileById(event.target.id)]);

    this.swapSubscription = swapAndTradeOwnerProfile.subscribe(([swap, offerOwnerProfile]) => {
      swap.tradeOffers.forEach(offer => {
        offer.status.pending = false;
        offer.user._id === event.target.id ? offer.status.accepted = true : offer.status.declined = true;
      });
      swap.status.completed = true;
      this.swapService.partialSwapUpdate(swap._id, swap)

      const currentTradeOffer = offerOwnerProfile.myTradeOffers.filter(offer => offer.swapId === swap._id).pop()!; 
      currentTradeOffer.status.pending = false;
      currentTradeOffer.status.accepted = true;

      this.swapService.partialSwapUpdate(swap._id, swap).then(() => 
        this.userService.partialProfileUpdate(currentTradeOffer.user._id, offerOwnerProfile)
          .then()
          .catch(err => { throw new Error(err) })
        ).catch(err => { throw new Error(err) })
    });

    setInterval(() => {
      this.swapSubscription.unsubscribe();
    }, 2500);
  }

  onImgUpload(event: any) {
    if (event.target.files.length) {
      const files: any[] = Array.from(event.target.files);
      this.formImages = files
    }
    return;
  }


}