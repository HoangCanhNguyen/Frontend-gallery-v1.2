import { Component, OnInit } from '@angular/core';
import { GetCarouselHeightService } from '../shared/service/getCarouselHeight.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  constructor(private getCarouselHeight: GetCarouselHeightService) { }

  ngOnInit(): void {
    this.getCarouselHeight.getCarouselHeight(0);
    document.getElementById('fixed').classList.add('sticky');
  }

}
