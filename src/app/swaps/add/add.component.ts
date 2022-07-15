import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addError, clearError } from 'src/app/+store/actions';
import { IAppState } from 'src/app/+store/reducers';
import { currentErrorSelector, currentUserSelector } from 'src/app/+store/selectors';
import { ImageService } from 'src/app/shared/image-service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { ITrade } from 'src/app/shared/interfaces/trade';
import { validations } from 'src/app/shared/utils';
import { TradeService } from 'src/app/trades/trade.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  trades$!: Observable<ITrade[]>

  profileSubscription!: Subscription;
  currentUser!: IProfile | null;

  images: any = [];
  uploading: number = 0;
  isUploading: boolean = false;
  swapImages: string[] = []

  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private tradeService: TradeService,
    private swapService: SwapService,
    private router: Router,
    private store: Store<IAppState>,
    private imageStorage: ImageService
  ) { }


  ngOnInit() {
    this.trades$ = this.tradeService.getTrades();
    this.profileSubscription = this.store.select(currentUserSelector).subscribe(profile => this.currentUser = profile);
  }

  ngOnDestroy(): void {
    this.uploading = 0;
    this.isUploading = false;
    this.profileSubscription.unsubscribe();
  }

  async onCreateSwap(form: NgForm): Promise<void> {
    this.isUploading = true;
    if (!this.currentUser) {
      this.store.dispatch(addError({ error: 'You must be logged in in order to create your own Swap!' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    }
    // re-check-check form data
    const formIsValid = validations.title(form.value.swapTitle)
      && validations.notes(form.value.additionalNotes)
      && validations.openUntil(form.value.openUntil)
      && validations.trade(form.value.trade);

    if (form.invalid || !formIsValid) { return }

    try {
      if(this.images.length) { this.swapImages = this.images.map((v: any) => v.name) }
      const swapRef = await this.swapService.addSwap(
        Object.assign({}, form.value, {
          tradeOffers: [], status: { completed: false },  _ownerId: this.currentUser._id, swapImages: this.swapImages  })
      );

      if (this.images.length) {
        for (let i = 0; i < this.images.length; i++) {
          this.uploading = Math.round((100 * i) / this.images.length);
          try {
            await this.imageStorage.uploadImg(swapRef.id, this.images[i].name, this.images[i]);
          } catch (err) {
            this.isUploading = false;
            this.uploading = 0;
            this.store.dispatch(addError({ error: 'There was an error while uploading Images. Please try again.'}));
            setTimeout(() => {
              this.store.dispatch(clearError());
            }, 3500)
            return;
          }
        }
      }

      form.reset();
      this.router.navigate([`/swaps/${swapRef.path.split('/')[1]}`]);
    } catch (err) {
      this.isUploading = false;
      this.uploading = 0;
      this.store.dispatch(addError({ error: 'There was an error while adding your Swap. Please try again.'}));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    }

  }

  async onImgUpload(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (files.length) { this.images = files };
    return;
  }
}