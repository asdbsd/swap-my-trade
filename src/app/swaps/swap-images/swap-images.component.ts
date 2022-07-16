import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image-service';

@Component({
  selector: 'app-swap-images',
  templateUrl: './swap-images.component.html',
  styleUrls: ['./swap-images.component.scss']
})
export class SwapImagesComponent implements OnInit {

  constructor( ) { }

  @Input() imagesLinks!: string[];

  swapImageLinks!: string[];
  tradeImageLinks!: string[];

  ngOnInit(): void {

  }

}
