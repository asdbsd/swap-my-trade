import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapsComponent } from './swaps.component';
import { MySwapsComponent } from './my-swaps/my-swaps.component';
import { SwapDetailsComponent } from './swap-details/swap-details.component';
import { SwapsRoutingModule } from './swaps-routing.module';



@NgModule({
  declarations: [
    SwapsComponent,
    MySwapsComponent,
    SwapDetailsComponent
  ],
  imports: [
    CommonModule,
    SwapsRoutingModule
  ]
})
export class SwapModule { }
