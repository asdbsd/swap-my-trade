import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { addError, clearError } from 'src/app/+store/actions';
import { currentErrorSelector } from 'src/app/+store/selectors';
import { ImageService } from 'src/app/shared/image-service';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-offer-trade',
  templateUrl: './offer-trade.component.html',
  styleUrls: ['./offer-trade.component.scss']
})
export class OfferTradeComponent implements OnInit {

  @Input() swap!: ISwap;
  @Input() offerUserId!: string;

  currrentImagesToUpload!: any[];
  isUploading: boolean = false;
  uploading: number = 0;


  swapOwnerTrades$!: Observable<string[]>;
  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private userService: UserService,
    private tradeService: TradeService,
    private store: Store<any>,
    private imageStorage: ImageService,
    private swapService: SwapService
  ) { }

  ngOnInit(): void {
    this.swapOwnerTrades$ = combineLatest([
      this.userService.getProfileById(this.swap._ownerId),
      this.tradeService.getTrades()
    ]).pipe(
      map(([profile, trades]) => {
        profile.myTrades = trades.filter(trade => profile.myTrades.includes(trade._id)).map(trade => trade.name);
        return profile.myTrades;
      })
    )
  }

  async onTradeSubmit(form: NgForm, event$: Event): Promise<void> {
    this.isUploading = true;
    if (form.invalid) { return; }

    const selectedTrades = [];
    for (let [k, v] of Object.entries(form.value)) { v === true ? selectedTrades.push(k) : null; }

    if (selectedTrades.length < 1) {
      this.store.dispatch(addError({ error: 'At least one trade must be selected.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    };

    if (this.currrentImagesToUpload.length < 1) {
      this.store.dispatch(addError({ error: 'At least one images for requested trade must be provided.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    };

    const combinedAddress = form.value.tradeAddress + ', ' + form.value.tradeAddress2;

    try {
      if (this.currrentImagesToUpload.length) {
        console.log(this.currrentImagesToUpload)
        for (let i = 0; i < this.currrentImagesToUpload.length; i++) {

          this.uploading = Math.round((100 * (i + 1)) / this.currrentImagesToUpload.length);

          try {
            await this.imageStorage.uploadTradesImg(this.swap._id, this.currrentImagesToUpload[i].name, this.offerUserId, this.currrentImagesToUpload[i]);
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
      }

      this.currrentImagesToUpload = this.currrentImagesToUpload.map(image => image.name)
    } catch (err) {
      this.isUploading = false;
      this.uploading = 0;
      this.store.dispatch(addError({ error: 'There was an error while adding your Swap. Please try again.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    }

    
    this.swap.tradeOffers.push({
      status: {
        accepted: false,
        pending: true,
        declined: false
      },
      tradeStartDate: form.value.tradeStartDate,
      tradeEndDate: form.value.tradeEndDate,
      tradesRequested: selectedTrades,
      address: combinedAddress,
      notes: form.value.tradeNoteInput,
      user: this.offerUserId,
      tradeImages: this.currrentImagesToUpload
    });

    
    try {
      await this.swapService.partialSwapUpdate(this.swap._id, this.swap.tradeOffers);
    } catch (err) {
      console.log(err);
      return;
    }

    this.isUploading = false;
    this.uploading = 0;
    form.reset();

  }

  async onImgUpload(event$: any): Promise<void> {
    const files: File[] = Array.from(event$.target.files);
    if (files.length) { this.currrentImagesToUpload = files };
    return;
  }

}
