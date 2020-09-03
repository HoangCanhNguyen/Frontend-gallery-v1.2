import { Component, OnInit } from '@angular/core';
import { PicturesService } from 'src/app/shared/service/pictures.service';
import { Picture } from 'src/app/shared/model/picture.model';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit {
  picturesList: Picture[] = [];

  constructor(private pictureService: PicturesService) { }

  ngOnInit(): void {
    this.pictureService.getData().subscribe((data) => {
      this.picturesList = data;
    });

  }

}
