import { Component, Input, OnInit, Output } from '@angular/core';
import { ITrades } from 'src/app/shared/interfaces/trades';
import { UserService } from 'src/app/users/user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-swap-trades',
  templateUrl: './swap-trades.component.html',
  styleUrls: ['./swap-trades.component.scss']
})
export class SwapTradesComponent implements OnInit {

  @Input() tradeOffers!: ITrades[];
  @Output() isTradeSelected = new EventEmitter<boolean>();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  
  onTradeOfferSelected(event: any): void {
    if(event.target!.tagName === 'TD' && event.target.parentElement.tagName === 'TR') {
      this.isTradeSelected.emit(event.target.parentElement.id);
    }
  }

}
