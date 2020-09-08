import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/shared/model/picture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PicturesService } from 'src/app/shared/service/pictures.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.css']
})
export class EditArtworkComponent implements OnInit {

  editedArtwork: Picture;
  editPic = true;
  picTitle = '';
  picArtist = '';
  picPrice = '';
  picCategory = '';
  picDes = '';
  picImageURL = '';

  constructor(private activatedRoute: ActivatedRoute, private pictureService: PicturesService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let picId = params['id'];
      if (picId) {
        this.pictureService.getPicById({ "id": picId }).subscribe((picture) => {
          if (picture !== null) {
            this.editedArtwork = picture;
            this.picTitle = picture.title;
            this.picArtist = picture.artist;
            this.picPrice = picture.price;
            this.picCategory = picture.category;
            this.picDes = picture.description;
            this.picImageURL = picture.imageLink;
            console.log(this.picTitle, this.picArtist, this.picCategory, this.picDes, this.picImageURL, this.picPrice)
          }
        });
      }

    })
  }

  onSaveEditedContent(form: NgForm) {
    console.log(form.value);
    this.router.navigate(['/console/artworks'])
  }

}
