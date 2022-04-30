import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { addError, clearError } from 'src/app/+store/actions';
import { currentErrorSelector, currentUserSelector } from 'src/app/+store/selectors';
import { ImageServiceService } from 'src/app/shared/image-service.service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { validations } from 'src/app/shared/utils';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swap-details',
  templateUrl: './swap-details.component.html',
  styleUrls: ['./swap-details.component.scss']
})
export class SwapDetailsComponent implements OnInit, OnDestroy {
  appDataSubscription!: Subscription;
  currentSwapSubscription!: Subscription;
  currentSwapOwnerSubscription!: Subscription;

  // ALL
  swap!: ISwap;
  swapImages!: string[];
  currentSwapOwner!: IProfile;

  currentSwapsImages!: [];
  currentTradesImages!: [];


  // currentUser
  currentUser: IProfile | null = null;
  currentTradeOffer!: any;
  currentSwapOffers: any []= [];
  currentSwapOffer!: any;

  formImages: any[] = [];

  uploading: number = 0;
  isUploading: boolean = false;

  error$: Observable<string> = this.store.select(currentErrorSelector);

  showOwnerHome: boolean = false;
  showOwnerAcceptedWithAdd: boolean = false;
  showOwnerAcceptedWithPending: boolean = false;
  showOwnerAcceptedWithAccepted: boolean = false;

  showNotOwnerAdd: boolean = false;
  showNotOwnerPendingOrAccepted: boolean = false;
  showNotOwnerAcceptedWithPending: boolean = false;
  showNotOwnerCompletedWithAccepted: boolean = false;


  constructor(
    private swapService: SwapService,
    private tradeService: TradeService,
    private activatedRoute: ActivatedRoute,
    private imageStorage: ImageServiceService,
    private userService: UserService,
    private store: Store<any>,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.loadContent()
  }


  ngOnDestroy(): void {
    this.appDataSubscription.unsubscribe();
    this.currentSwapSubscription.unsubscribe()

  }

  async onSwapOfferSubmit(form: NgForm, $event: any) {
    this.isUploading = true;
    if (form.invalid) { return; }

    const requestedTrades = [];
    for (let [k, v] of Object.entries(form.value)) { v === true ? requestedTrades.push(k) : null; }

    if (requestedTrades.length < 1) {
      this.store.dispatch(addError({ error: 'At least one trade must be selected.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return
    };

    const formIsValid = validations.notes(form.value.additionalNotes)
      && validations.openUntil(form.value.swapStartDate)
      && validations.openUntil(form.value.swapEndDate)
      && validations.title(form.value.address)


    if (form.invalid || !formIsValid) { return }

    try {
      const combinedAddress = form.value.address + ', ' + form.value.address2;

      let imageNames: string[] = [];
      if (this.formImages.length) { imageNames = this.formImages.map(v => v.name) }
      this.swap.swapOffers.push({
        status: {
          accepted: false,
          pending: true,
          declined: false
        },
        swapEndDate: form.value.swapStartDate,
        swapStartDate: form.value.swapEndDate,
        tradesRequested: requestedTrades,
        address: combinedAddress,
        notes: form.value.additionalNotes,
        swapOfferImages: imageNames,
        user: this.currentUser!._id
      });

      await this.swapService.partialSwapUpdate(
        this.swap._id,
        this.swap.swapOffers,
        this.swap.tradeOffers
      );

      if (this.formImages.length) {
        for (let i = 0; i < this.formImages.length; i++) {
          this.uploading = Math.round((100 * i) / this.formImages.length);
          try {
            await this.imageStorage.uploadImg(this.currentUser!._id, this.formImages[i].name, this.formImages[i]);

          } catch (err) {
            this.isUploading = false;
            this.uploading = 0;
            this.store.dispatch(addError({ error: 'There was an error while uploading Images. Please try again.' }));
            setTimeout(() => {
              this.store.dispatch(clearError());
            }, 3500)
            return;
          }
        }
        this.isUploading = false;
        this.uploading = 0;
      }

      this.router.navigate([`/swaps/${this.swap._id}`]);
      $event.target.form.reset();
    } catch (err) {
      this.isUploading = false
      this.uploading = 0;
      console.log(err);
      this.store.dispatch(addError({ error: 'There was an error while adding your Swap. Please try again.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    }

  }

  async loadContent() {
    this.appDataSubscription = this.store.select(currentUserSelector).subscribe(profile => this.currentUser = profile);
    this.currentSwapSubscription = this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']).pipe(
      switchMap((swap: ISwap) => {
        this.swap = swap;
        this.imageStorage.getSwapImages(swap._id).then(images => this.swapImages = images);
        this.currentTradeOffer = this.swap.tradeOffers[0];


        if(this.currentUser) {
          this.currentSwapOffer = this.swap.swapOffers.filter(offer => offer.user === this.currentUser?._id)[0];
        }

        if (swap._ownerId === this.currentUser?._id) {
          this.currentSwapOffers = this.swap.swapOffers;
          this.currentTradeOffer = this.swap.tradeOffers.map(offer => offer.user === this.currentUser?._id)[0];
        }


        this.showNotOwnerAdd = this.swap._id !== this.currentUser?._id && this.swap.swapOffers.filter((offer) => offer.user === this.currentUser?._id).length < 1;

        this.showNotOwnerPendingOrAccepted = swap._ownerId === this.currentUser?._id;

        this.showNotOwnerAcceptedWithPending = this.currentTradeOffer && this.swap._ownerId !== this.currentUser?._id && this.currentTradeOffer.status.pending;

        this.showNotOwnerCompletedWithAccepted = this.swap.swapOffers.filter((offer: any) => offer.user === this.currentUser?._id).length > 0
          && this.swap.tradeOffers.length > 1 && this.swap.tradeOffers.filter((offer: any) => offer.status.accepted).length > 1 && this.swap._ownerId !== this.currentUser?._id;


        this.showOwnerHome = (swap.swapOffers.filter((o: any) => o.status.pending)).length > 1 && swap._ownerId === this.currentUser?._id;
        this.showOwnerAcceptedWithAdd = (this.swap.swapOffers.filter((o: any) => o.status.accepted)).length > 0 && this.currentSwapOffer._ownerId === this.currentUser?._id;
        this.showOwnerAcceptedWithPending = (this.swap.swapOffers.filter((o: any) => o.status.accepted)).length > 0 && this.swap.tradeOffers.length > 0 && this.swap._ownerId === this.currentUser?._id;
        this.showOwnerAcceptedWithAccepted = (this.swap.swapOffers.filter((o: any) => o.status.accepted)).length > 0 && (this.swap.tradeOffers.filter((o: any) => o.status.accepted)).length > 0 && this.swap._ownerId === this.currentUser?._id;

        console.log('OWNER')
        console.log(`showOwnerHome`, this.showOwnerHome)
        console.log(`showOwnerAcceptedWithAdd`, this.showOwnerAcceptedWithAdd)
        console.log(`showOwnerAcceptedWithPending`, this.showOwnerAcceptedWithPending)
        console.log(`showOwnerAcceptedWithAccepted`, this.showOwnerAcceptedWithAccepted)

        console.log('NOT OWNER')
        console.log(`showNotOwnerAdd`, this.showOwnerHome)
        console.log(`showNotOwnerPendingOrAccepted`, this.showOwnerAcceptedWithAdd)
        console.log(`showNotOwnerAcceptedWithPending`, this.showOwnerAcceptedWithPending)
        console.log(`showNotOwnerCompletedWithAccepted`, this.showOwnerAcceptedWithAccepted)

        return this.userService.getProfileById(this.swap._ownerId)
      }),
      switchMap((profile) => {
        this.currentSwapOwner = profile;
        return this.tradeService.getTrades()
      }),
      switchMap((trades) => {
        for (let i = 0; i < trades.length; i++) {
          if (trades[i]._id === this.swap.trade) {
            this.swap.trade = trades[i].name
          }
          for (let y = 0; y < this.currentSwapOwner.myTrades.length; y++) {
            if (trades[i]._id === this.currentSwapOwner.myTrades[y]) {
              this.currentSwapOwner.myTrades[y] = trades[i].name
            }
          }
        }
        return of(this.swap)
      })).subscribe();


  }


  onAcceptOffer() {
    const getSwapSubscription = this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']).subscribe(
      (swap) => {
        const newSwapOffers = Object.assign([],
          (swap.swapOffers.filter(offer => offer.user == this.currentUser!._id)),
          { status: { pending: false, declined: false, accepted: true } });
        this.swapService.partialSwapUpdate(this.activatedRoute.snapshot.params['id'], [newSwapOffers]).then(() => null);

      }
    );
    getSwapSubscription.unsubscribe();
  }



  async onTradeSubmit(form: NgForm, event: Event) {
    if (form.invalid) { return; }
  
    const offeredTrades = this.currentSwapOffer.tradesRequested

    if (offeredTrades.length < 1) {
      this.store.dispatch(addError({ error: 'At least one trade must be selected.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return
    };

    const combinedAddress = form.value.address + ', ' + form.value.address2;

    this.swap.tradeOffers.push({
      status: {
        accepted: false,
        pending: true,
        declined: false
      },
      tradeStartDate: form.value.tradeStartDate,
      tradeEndDate: form.value.tradeEndDate,
      tradesRequested: offeredTrades,
      address: combinedAddress,
      notes: form.value.additionalNotes,
      user: this.currentUser!._id
    });

    await this.swapService.partialSwapUpdate(
      this.swap._id,
      this.swap.swapOffers,
      this.swap.tradeOffers
    );


    this.router.navigate([`/swaps/${this.swap._id}`]);
  }

  async onImgUpload(event: any) {
    if (event.target.files.length) {
      const files: any[] = Array.from(event.target.files);
      this.formImages = files
    }
    return;
  }


}