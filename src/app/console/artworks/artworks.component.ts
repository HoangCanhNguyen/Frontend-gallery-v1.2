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

  openDeletePopup(picId: number, content: string) {

    if (content === 'deleteSoldPic') {
      const element2 = document.querySelectorAll('.latest-artworks-sold-container .carousel-item.active .artwork-item')[picId];
      element2.classList.add('show-confirm-box');
    } else {
      const element1 = document.querySelectorAll('.all-artworks-container .carousel-item.active .artwork-item')[picId];
      element1.classList.add('show-confirm-box');
    }

  }
  closePopup(picId: number, content: string) {

    if (content === 'deleteSoldPic') {
      const element2 = document.querySelectorAll('.latest-artworks-sold-container .carousel-item.active .artwork-item')[picId];
      element2.classList.remove('show-confirm-box');

    }
    else {
      const element1 = document.querySelectorAll('.all-artworks-container .carousel-item.active .artwork-item')[picId];
      element1.classList.remove('show-confirm-box');
    }

  }
  deleteArtwork() {

  }
}
