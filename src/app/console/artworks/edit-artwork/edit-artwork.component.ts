import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/shared/model/picture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PicturesService } from 'src/app/shared/service/pictures.service';
import { NgForm } from '@angular/forms';
import { UploadImageService } from 'src/app/shared/service/upload-image.service';
import { PreloadService } from 'src/app/shared/service/preload.service';

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.css']
})
export class EditArtworkComponent implements OnInit {

  editPic = true;
  picTitle = '';
  picArtist = '';
  picPrice = '';
  picCategory = '';
  picDes = '';
  picImageURL = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private pictureService: PicturesService,
    private router: Router,
    private uploadImageService: UploadImageService,
    private preloadService: PreloadService
  ) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {
      const picId = params['id'];
      if (picId) {
        setTimeout(() => {
          this.preloadService.show()
        })

        this.pictureService.getPicById({ "id": picId }).subscribe((picture) => {
          if (picture !== null) {
            this.picTitle = picture.title;
            this.picArtist = picture.artist;
            this.picPrice = picture.price;
            this.picCategory = picture.category;
            this.picDes = picture.description;
            this.picImageURL = picture.imageLink;
            this.preloadService.hide()
          }
        });
      }
    })

    this.uploadImageService.imageContentSubject.subscribe(content => {
      if (content === 'new-artwork') {
        this.uploadImageService.imageURLSubject.subscribe(res => {
          this.picImageURL = res;
        })
      }
    })
  }

  onSaveEditedContent(form: NgForm) {
    console.log(form.value);
    // this.uploadImageService.uploadAvatar();
    // this.router.navigate(['/console/artworks'])
  }

  preview(files: FileList, content: string) {
    this.uploadImageService.preview(files, content);
  }
}
