import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITrade } from 'src/app/shared/interfaces/trades'; 
import { validations } from 'src/app/shared/utils';
import { TradeService } from 'src/app/trades/trade.service';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  tradeSubscribtion!: Subscription;
  trades$: Observable<ITrade[]> = this.tradeService.getTrades();

  trades!: ITrade[];

  constructor(
    private tradeService: TradeService,
    private swapService: SwapService,
    private router: Router
  ) { }


  ngOnInit() {
    this.tradeSubscribtion = this.trades$.subscribe((trades) => this.trades = trades)
  }

  ngOnDestroy(): void {
    this.tradeSubscribtion.unsubscribe();
  }

  async onCreateSwap(form: NgForm): Promise<void> {
    // re-check-check form data
    const formIsValid = validations.title(form.value.swapTitle)
                    && validations.notes(form.value.additionalNotes)
                    && validations.openUntil(form.value.openUntil)
                    && validations.trade(form.value.trade);

    if(form.invalid || !formIsValid ) { return }

    const data = await this.swapService.addSwap(Object.assign({}, form.value, { offers: [], status: { completed: false }}));

    this.router.navigate([`/swaps/${data.path.split('/')[1]}`]);
  }
}