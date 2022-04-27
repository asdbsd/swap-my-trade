import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from './+store/reducers';
import { Store } from '@ngrx/store';
import { currentErrorSelector } from './+store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  error$: Observable<string> = this.store.select(currentErrorSelector);
  constructor( 
    private store: Store<IAppState>
  ) { }

}
