import { Component } from '@angular/core';
import { IAppState } from './+store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor( 
    private store: Store<IAppState>
  ) { }

}
