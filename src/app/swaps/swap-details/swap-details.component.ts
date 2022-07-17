import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { currentErrorSelector, currentUserSelector } from 'src/app/+store/selectors';
import { ImageService } from 'src/app/shared/image-service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrades } from 'src/app/shared/interfaces/trades';
import { TradeService } from 'src/app/trades/trade.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swap-details',
  templateUrl: './swap-details.component.html',
  styleUrls: ['./swap-details.component.scss']
})
export class SwapDetailsComponent implements OnInit, OnDestroy {

  isTradeOwnerSubscription!: Subscription;
  tradeOfferSubscription!: Subscription;

  swap$!: Observable<ISwap>;
  loggedInUser$: Observable<IProfile | null> = this.store.select(currentUserSelector);

  tradeOfferToDisplay$!: Observable<ITrades>;
  tradeImages!: string[];
  previousTradeEvent!: any;

  isTradeSelected: boolean = false;
  isTradeOwner: boolean = false;
  formImages: any[] = [];

  uploading: number = 0;
  isUploading: boolean = false;

  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private swapService: SwapService,
    private tradeService: TradeService,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private imageService: ImageService
  ) { }


  ngOnInit(): void {
    this.swap$ = combineLatest([
      this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']),
      this.tradeService.getTrades()
    ]).pipe(
      switchMap(([swap, trades]) => {
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
    )

    this.tradeOfferSubscription = combineLatest([this.swap$, this.tradeOfferToDisplay$]).subscribe(([swap, offer]) => {
      this.imageService.getTradeImages(swap._id, offer.user._id).then((links) => this.tradeImages = links);
    })

  }

  ngOnDestroy(): void {
    this.isTradeOwnerSubscription.unsubscribe();
    this.tradeOfferSubscription.unsubscribe();
  }

  setTradeSelected(event: any) {

    if (this.previousTradeEvent && (event.target.parentElement.id === this.previousTradeEvent.target.parentElement.id)) {
      if(this.isTradeSelected) {
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

  // async onSwapOfferSubmit(form: NgForm, $event: any) {
  //   this.isUploading = true;
  //   if (form.invalid) { return; }

  //   const requestedTrades = [];
  //   for (let [k, v] of Object.entries(form.value)) { v === true ? requestedTrades.push(k) : null; }

  //   if (requestedTrades.length < 1) {
  //     this.store.dispatch(addError({ error: 'At least one trade must be selected.' }));
  //     setTimeout(() => {
  //       this.store.dispatch(clearError());
  //     }, 3500)
  //     return
  //   };

  //   const formIsValid = validations.notes(form.value.additionalNotes)
  //     && validations.openUntil(form.value.swapStartDate)
  //     && validations.openUntil(form.value.swapEndDate)
  //     && validations.title(form.value.address)


  //   if (form.invalid || !formIsValid) { return }

  //   try {
  //     const combinedAddress = form.value.address + ', ' + form.value.address2;

  //     let imageNames: string[] = [];
  //     if (this.formImages.length) { imageNames = this.formImages.map(v => v.name) }
  //     this.swap.swapOffers.push({
  //       status: {
  //         accepted: false,
  //         pending: true,
  //         declined: false
  //       },
  //       swapEndDate: form.value.swapStartDate,
  //       swapStartDate: form.value.swapEndDate,
  //       tradesRequested: requestedTrades,
  //       address: combinedAddress,
  //       notes: form.value.additionalNotes,
  //       swapOfferImages: imageNames,
  //       user: this.currentUser!._id
  //     });

  //     await this.swapService.partialSwapUpdate(
  //       this.swap._id,
  //       this.swap.swapOffers,
  //       this.swap.tradeOffers
  //     );

  //     if (this.formImages.length) {
  //       for (let i = 0; i < this.formImages.length; i++) {
  //         this.uploading = Math.round((100 * i) / this.formImages.length);
  //         try {
  //           await this.imageStorage.uploadImg(this.currentUser!._id, this.formImages[i].name, this.formImages[i]);

  //         } catch (err) {
  //           this.isUploading = false;
  //           this.uploading = 0;
  //           this.store.dispatch(addError({ error: 'There was an error while uploading Images. Please try again.' }));
  //           setTimeout(() => {
  //             this.store.dispatch(clearError());
  //           }, 3500)
  //           return;
  //         }
  //       }
  //       this.isUploading = false;
  //       this.uploading = 0;
  //     }

  //     this.router.navigate([`/swaps/${this.swap._id}`]);
  //     $event.target.form.reset();
  //   } catch (err) {
  //     this.isUploading = false
  //     this.uploading = 0;
  //     console.log(err);
  //     this.store.dispatch(addError({ error: 'There was an error while adding your Swap. Please try again.' }));
  //     setTimeout(() => {
  //       this.store.dispatch(clearError());
  //     }, 3500)
  //     return;
  //   }

  // }


  onAcceptOffer() {
    // const getSwapSubscription = this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']).subscribe(
    //   (swap) => {
    //     const newSwapOffers = Object.assign([],
    //       (swap.swapOffers.filter(offer => offer.user == this.currentUser!._id)),
    //       { status: { pending: false, declined: false, accepted: true } });
    //     this.swapService.partialSwapUpdate(this.activatedRoute.snapshot.params['id'], [newSwapOffers]).then(() => null);

    //   }
    // );
    // getSwapSubscription.unsubscribe();
  }



  // async onTradeSubmit(form: NgForm, event: Event) {
  //   if (form.invalid) { return; }

  //   const offeredTrades = this.currentSwapOffer.tradesRequested

  //   if (offeredTrades.length < 1) {
  //     this.store.dispatch(addError({ error: 'At least one trade must be selected.' }));
  //     setTimeout(() => {
  //       this.store.dispatch(clearError());
  //     }, 3500)
  //     return
  //   };

  //   const combinedAddress = form.value.address + ', ' + form.value.address2;

  //   this.swap.tradeOffers.push({
  //     status: {
  //       accepted: false,
  //       pending: true,
  //       declined: false
  //     },
  //     tradeStartDate: form.value.tradeStartDate,
  //     tradeEndDate: form.value.tradeEndDate,
  //     tradesRequested: offeredTrades,
  //     address: combinedAddress,
  //     notes: form.value.additionalNotes,
  //     user: this.currentUser!._id
  //   });

  //   await this.swapService.partialSwapUpdate(
  //     this.swap._id,
  //     this.swap.swapOffers,
  //     this.swap.tradeOffers
  //   );


  //   this.router.navigate([`/swaps/${this.swap._id}`]);
  // }

  async onImgUpload(event: any) {
    if (event.target.files.length) {
      const files: any[] = Array.from(event.target.files);
      this.formImages = files
    }
    return;
  }


}