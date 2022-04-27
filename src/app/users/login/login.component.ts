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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private store: Store,
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
        profiles.filter((profile: IProfile) => profile.uid == loginRef._tokenResponse.localId);
        return this.userService.getProfileById(profiles[0]._id);
      })).subscribe({
        next: (currentUser: IProfile) => {
          this.store.dispatch(setCurrentUser({ currentUser }))
        },
        error: (err: any) => { err }
      })

    this.router.navigate(['/swaps']);
  }

}


