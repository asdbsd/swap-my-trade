import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySwapsComponent } from './my-swaps/my-swaps.component';
import { SwapDetailsComponent } from './swap-details/swap-details.component';
import { SwapsComponent } from './swaps.component';

const routes: Routes = [
  {
    path: 'swaps',
    component: SwapsComponent
  },
  {
      path: 'swaps/:id',
      component: SwapDetailsComponent
  },
  {
      path: 'swaps/my-swaps',
      component: MySwapsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwapsRoutingModule { }
