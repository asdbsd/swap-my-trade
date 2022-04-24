import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapsComponent } from './swaps.component';
import { MySwapsComponent } from './my-swaps/my-swaps.component';
import { SwapDetailsComponent } from './swap-details/swap-details.component';
import { SwapsRoutingModule } from './swaps-routing.module';
import { AddComponent } from './add/add.component';



@NgModule({
  declarations: [
    SwapsComponent,
    MySwapsComponent,
    SwapDetailsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    SwapsRoutingModule
  ]
})
export class SwapModule { }
