import { Component, OnInit } from '@angular/core';
import { GetCarouselHeightService } from 'src/app/shared/service/getCarouselHeight.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  isOpened = false;

  constructor(private getCarouselHeight: GetCarouselHeightService) { }

  ngOnInit(): void {
    this.getCarouselHeight.getCarouselHeight(0);
    document.getElementById('fixed').classList.add('sticky');
  }

  onOpenRegister(): void {
    this.isOpened = !this.isOpened;
  }

}
