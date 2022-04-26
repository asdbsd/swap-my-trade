import { Component } from '@angular/core';
import { Store } from '@ngrx/store'
import { getCurrentUser } from './+store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser$ = this.rxStore.select(getCurrentUser);

  constructor(
    private rxStore: Store<any>
  ) {
  }

}
