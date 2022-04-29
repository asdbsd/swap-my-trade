import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Observable, Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { addError, clearError, setCurrentUser } from 'src/app/+store/actions';
import { Router } from '@angular/router';
import { getErrorText } from 'src/app/shared/utils';
import { currentErrorSelector } from 'src/app/+store/selectors';
import { IAppState } from 'src/app/+store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  error$: Observable<string> = this.store.select(currentErrorSelector);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private store: Store<IAppState>,
    private router: Router
  ) { }

  ngOnDestroy(): void {
  }

  async onFormSubmit(form: NgForm) {
    if (form.invalid) { return };
    let loginRef: any;

    try {
      loginRef = await this.authService.login({ email: form.value.email, password: form.value.password });
    } catch (err: any) {
      this.store.dispatch(addError({ error: getErrorText(err) }));
      setTimeout(() => {
        this.store.dispatch(clearError());
      }, 3500)
      return;
    }

    this.userService.getProfiles().pipe(
      switchMap((profiles: IProfile[]): Observable<IProfile> => {
        const myProfile = profiles.filter((profile: IProfile) => profile.email === loginRef._tokenResponse.email);
        return this.userService.getProfileById(myProfile[0]._id);
      })).subscribe({
        next: (currentUser: IProfile) => {
          this.store.dispatch(setCurrentUser({ currentUser }))
        },
        error: (err: any) => { err }
      });

    this.router.navigate(['/swaps']);
  }

}


