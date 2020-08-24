import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from 'src/app/shared/service/artist.service';
import { Subscription } from 'rxjs';
import { GetCarouselHeightService } from 'src/app/shared/service/getCarouselHeight.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {

  sub: Subscription;
  artist_name: string;
  artist_id: any;
  artist_info: any;
  constructor(private route: ActivatedRoute, private artistService: ArtistService, private getCarouselHeight: GetCarouselHeightService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.artist_id = params.artist_id;
      this.artist_name = params.artist_name;
    });
    this.artistService.getArtistById({ id: this.artist_id }).subscribe(artist => {
      this.artist_info = artist;
    });

    this.getCarouselHeight.getCarouselHeight(0);
    document.getElementById('fixed').classList.add('sticky');

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
}
