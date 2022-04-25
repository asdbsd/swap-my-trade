import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase methods
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';


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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }