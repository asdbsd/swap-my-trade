import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase methods
import { initializeApp,provideFirebaseApp } from '@angular/fire/app'; // App init
import { provideAuth,getAuth } from '@angular/fire/auth'; // App auth
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // App db
import { getStorage, provideStorage } from '@angular/fire/storage'; // App Storage


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './users/user.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SwapModule } from './swaps/swap.module';
import { environment } from '../environments/environment';
import { TradeModule } from './trades/trade.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { GlobalCurrenTUserReducer } from './+store/reducers';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CoreModule,
    UserModule,
    SwapModule,
    AppRoutingModule,
    TradeModule,
    StoreModule.forRoot({ state: GlobalCurrenTUserReducer }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }