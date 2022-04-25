import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISwap } from 'src/app/shared/interfaces/swaps';
import { SwapService } from '../swap.service';

@Component({
  selector: 'app-swaps',
  templateUrl: './swaps.component.html',
  styleUrls: ['./swaps.component.scss']
})
export class SwapsComponent implements OnInit {
  
  swaps$!: Observable<ISwap[]>

  constructor(
    private swapsService: SwapService
  ) { }

  ngOnInit(): void {
    
  }

}
