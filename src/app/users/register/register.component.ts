import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store'
import { ITrade } from 'src/app/shared/interfaces/trade';
import { TradeService } from 'src/app/trades/trade.service';
import { UserService } from '../user.service';
import { addError, clearError, setCurrentUser } from 'src/app/+store/actions';
import { AuthService } from 'src/app/core/auth.service';
import { getErrorText } from 'src/app/shared/utils';
import { currentErrorSelector } from 'src/app/+store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  trades$: Observable<ITrade[]>
  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private tradeService: TradeService,
    private userService: UserService,
    private router: Router,
    private store: Store<any>,
    private authService: AuthService
  ) {
    this.trades$ = this.tradeService.getTrades();
  }


  ngOnInit(): void {

  }

  async onFormSubmit(form: NgForm) {
    if (form.invalid) { return; }

    const myTrades = [];
    for (let [k, v] of Object.entries(form.value)) { v === true ? myTrades.push(k) : null; }

    if (myTrades.length < 1) {
      this.store.dispatch(addError({ error: 'At least one trade must be selected.' }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return
    };

    let response;
    try {
      response = await this.authService.register({ email: form.value.email, password: form.value.password })
    } catch (err) {
      this.store.dispatch(addError({ error: getErrorText(err) }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    }

    const profile = Object.assign(
      {},
      {
        uid: response.user.uid,
        email: form.value.email,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phoneNumber: '',
        profileImg: '/assets/swap-my-trade-profile.png',
        myTrades: myTrades,
        completed: 0
      }
    )

    let profileRef;
    try {
      profileRef = await this.userService.addProfile(profile);
    } catch (err) {
      console.log(err);
      return;
    }

    this.userService.getProfileById(profileRef.id).subscribe(profile => {
      this.store.dispatch(setCurrentUser({ currentUser: profile }));
    })
    this.router.navigate(['/swaps']);


  }
}
