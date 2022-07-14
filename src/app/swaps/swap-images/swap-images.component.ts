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

  @Input() swapImages!: any[];
  images!: string[];
  @Input() swapId!: string;

  ngOnInit(): void {
    this.imageService.getSwapImages(this.swapId).then(images => this.images = images);
  }

}
