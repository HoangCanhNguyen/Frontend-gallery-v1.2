import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { GetCarouselHeightService } from 'src/app/shared/service/get-carousel-height.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit, AfterViewInit, OnDestroy {

  isOpened = false;

  constructor(private getCarouselHeight: GetCarouselHeightService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const imageHeight = window.innerHeight;
    this.getCarouselHeight.getCarouselHeight(imageHeight);
  }

  ngOnDestroy() {
    this.getCarouselHeight.getCarouselHeight(0);
  }

  onOpenRegister(): void {
    this.isOpened = !this.isOpened;
  }

}
