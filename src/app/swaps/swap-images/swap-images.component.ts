import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image-service';

@Component({
  selector: 'app-swap-images',
  templateUrl: './swap-images.component.html',
  styleUrls: ['./swap-images.component.scss']
})
export class SwapImagesComponent implements OnInit {

  constructor(
    private imageService: ImageService
  ) { }

  @Input() swapId!: string;
  @Input() swapImages!: any[];
  @Input() tradeImages!: any[];

  swapImagesLinks!: string[];
  tradeImagesLinks: string[] = [];

  ngOnInit(): void {
    if(this.swapImages.length) {
      this.imageService.getSwapImages(this.swapId).then(links => this.swapImagesLinks = links);
    }

    // if(this.tradeImages.length) {
    //   this.tradeImages.map(image => this.imageService.getSwapImages(this.swapId, ).then(link => this.tradeImagesLinks.push(link)))
    //   ;
    // }
  }

}
