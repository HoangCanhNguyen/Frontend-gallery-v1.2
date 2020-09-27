import { Component, OnInit } from '@angular/core';
import { PicturesService } from 'src/app/shared/service/pictures.service';
import { Picture } from 'src/app/shared/model/picture.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit {
  picturesList: Picture[] = [];
  pictureSlides = [[]];
  editedArtwork = new Subject<Picture>();

  constructor(
    private pictureService: PicturesService,
  ) { }

  ngOnInit(): void {

    this.pictureService.getData().subscribe((data) => {
      this.picturesList = data;
      this.pictureSlides = this.chunk(this.picturesList, 5);
    });
  }

  chunk(arr: Picture[], chunkSize: number) {
    let slide = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      slide.push(arr.slice(i, i + chunkSize));
    }
    return slide;
  }
}
