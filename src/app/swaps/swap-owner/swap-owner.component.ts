import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, switchMap, zip } from 'rxjs';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-swap-owner',
  templateUrl: './swap-owner.component.html',
  styleUrls: ['./swap-owner.component.scss']
})
export class SwapOwnerComponent implements OnInit {

  @Input() ownerId!: string;
  currentSwapOwner$!: Observable<IProfile>

  constructor(
    private userService: UserService,
    private tradeService: TradeService
  ) { }

  ngOnInit(): void {
    this.currentSwapOwner$ = zip(
      this.userService.getProfileById(this.ownerId),
      this.tradeService.getTrades()
    ).pipe(
      switchMap((result) => {
        result[0].myTrades.forEach((trade, i) => trade === result[1][i]._id 
                                                  ? result[0].myTrades[i] = result[1][i].name 
                                                  : null);
        return of(result[0]);
      })
    )
  }

}