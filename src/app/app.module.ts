import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './users/user.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SwapModule } from './swaps/swap.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    UserModule,
    SwapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
