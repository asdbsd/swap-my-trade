import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { ITrades } from 'src/app/shared/interfaces/trades';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-swap-trades',
  templateUrl: './swap-trades.component.html',
  styleUrls: ['./swap-trades.component.scss']
})
export class SwapTradesComponent implements OnInit {

  @Input() tradeOffers!: ITrades[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.tradeOffers.forEach(offer => {
      this.userService.getProfileById(offer.user).subscribe(profile => {
        offer.user = profile.firstName
      });
    });
  }

}
