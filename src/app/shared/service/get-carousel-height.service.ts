import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetCarouselHeightService {
  carouselHeight = new Subject<number>();

  getCarouselHeight(imageHeight: number): void {
    if (imageHeight > 0) {
      this.carouselHeight.next(imageHeight);
    } else if (imageHeight === 0) {
      this.carouselHeight.next(0);
    }
  }
}