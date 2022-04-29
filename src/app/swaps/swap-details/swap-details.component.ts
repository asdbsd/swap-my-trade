import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap } from 'rxjs';
import { addError, clearError } from 'src/app/+store/actions';
import { currentErrorSelector, currentUserSelector } from 'src/app/+store/selectors';
import { ImageServiceService } from 'src/app/shared/image-service.service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrade } from 'src/app/shared/interfaces/trades';
import { validations } from 'src/app/shared/utils';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swap-details',
  templateUrl: './swap-details.component.html',
  styleUrls: ['./swap-details.component.scss']
})
export class SwapDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSwapSubscription!: Subscription;

  swap!: ISwap;
  profile!: IProfile;

  formImages: any[] = [];
  swapImages!: any[]
  swapOfferImages!: any[];

  // currentUser
  profileSubscription!: Subscription;
  currentUser!: IProfile | null;


  //
  mySwap!: any;
  filteredPendingOffers: any;


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



  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.loadContent()

  }


  ngOnDestroy(): void {
    // this.currentSwapSubscription.unsubscribe()
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
    let imageNames: string[] = [];
    if (this.formImages.length) { imageNames = this.formImages.map(v => v.name) }

    try {
      const combinedAddress = form.value.address + ', ' + form.value.address2;

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
      this.isUploading = false;
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

    this.store.select(currentUserSelector).subscribe(profile => this.currentUser = profile);

    // Get current swap images
    try {
      this.swapImages = await this.imageStorage.getSwapImages(this.activatedRoute.snapshot.params['id']);
    } catch (err) {
      console.log(err);
    }

    this.currentSwapSubscription = this.swapService.getSwapById(this.activatedRoute.snapshot.params['id'])
      .pipe(
        // Get current swap
        switchMap((swap: ISwap) => {
          this.mySwap = swap;
          return this.userService.getProfileById(swap._ownerId);
        })
      ).pipe(
        switchMap((profile) => {
          this.profile = profile;
          return this.tradeService.getTrades()
        })).subscribe((trades: ITrade[]) => {
          for (let i = 0; i < trades.length; i++) {
            if (trades[i]._id === this.mySwap.trade) {
              this.mySwap.trade = trades[i].name
            }
            for (let y = 0; y < this.profile.myTrades.length; y++) {
              if (trades[i]._id === this.profile.myTrades[y]) {
                this.profile.myTrades[y] = trades[i].name
              }
            }
          }

          this.imageStorage.getSwapImages(this.mySwap._id).then(images => this.swapOfferImages = images);

          this.showNotOwnerAdd = this.mySwap.swapOffers.filter((offer :any) => offer.user === this.currentUser?._id).length < 1;

          this.showNotOwnerPendingOrAccepted = this.mySwap.swapOffers.filter((offer :any) => offer.user === this.currentUser?._id).length > 0 
            &&  this.mySwap.tradeOffers.length < 1;

          this.showNotOwnerAcceptedWithPending = this.mySwap.swapOffers.filter((offer :any) => offer.user === this.currentUser?._id).length > 0 
          && this.mySwap.tradeOffers.filter((offer: any) => offer.status.pending).length > 1 && this.mySwap.tradeOffers.length > 1 ;

          this.showNotOwnerCompletedWithAccepted = this.mySwap.swapOffers.filter((offer :any) => offer.user === this.currentUser?._id).length > 0 
          && this.mySwap.tradeOffers.length > 1 && this.mySwap.tradeOffers.filter((offer: any) => offer.status.accepted).length > 1 ;


            (this.mySwap.swapOffers.filter((o: any) => o.status.pending)).length
          this.showOwnerHome = (this.mySwap.swapOffers.filter((o: any) => o.status.pending)).length > 1;

          this.showOwnerAcceptedWithAdd = (this.mySwap.swapOffers.filter((o: any) => o.status.accepted)).length > 0 && this.mySwap.tradeOffers.length < 1;
          this.showOwnerAcceptedWithPending = (this.mySwap.swapOffers.filter((o: any) => o.status.accepted)).length > 0 && this.mySwap.tradeOffers.length > 0;
          this.showOwnerAcceptedWithAccepted = (this.mySwap.swapOffers.filter((o: any) => o.status.accepted)).length > 0 && (this.mySwap.tradeOffers.filter((o: any) => o.status.accepted)).length > 0


        });


  }

  onAcceptOffer() {
    const getSwapSubscription = this.swapService.getSwapById(this.activatedRoute.snapshot.params['id']).subscribe(
      (swap) => {
        const newSwapOffers = Object.assign([],
          (swap.swapOffers.filter(offer => offer.user == this.currentUser?._id)),
          { status: { pending: false, declined: false, accepted: true } })
        this.swapService.partialSwapUpdate(this.activatedRoute.snapshot.params['id'], [newSwapOffers]).then(() => null)
      }
    );
    getSwapSubscription.unsubscribe();
    this.showOwnerHome = false;
    this.showOwnerAcceptedWithPending = true;
  }



  async onTradeOfferSubmit(form: NgForm, event: Event) {
    console.log(event)
  }

  async onImgUpload(event: any) {
    if (event.target.files.length) {
      const files: any[] = Array.from(event.target.files);
      this.formImages = files
    }
    return;
  }


}
