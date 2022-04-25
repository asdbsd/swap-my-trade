import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-new-trade',
  templateUrl: './new-trade.component.html',
  styleUrls: ['./new-trade.component.scss']
})
export class NewTradeComponent implements OnInit {

  constructor(
    private tradeService: TradeService
   ) { }

  ngOnInit(): void {
  }

  async onSubmitTrade(form: NgForm) {
    form.value.name.trim();
    form.value.name = form.value.name.split(' ').map((v: string) => v.toLowerCase()).map((value: string) => value[0].toUpperCase() + value.slice(1)).join(' ');
    if( form.invalid || !form.value.name || form.value.name.length < 4) { return }
    form.value.name = '';
    const trade = await this.tradeService.addTrade(form.value)
    console.log('Trade Created', '->', trade)
  }

}
