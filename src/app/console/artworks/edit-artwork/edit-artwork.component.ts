import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PicturesService } from 'src/app/shared/service/pictures.service';
import { UploadImageService } from 'src/app/shared/service/upload-image.service';
import { PreloadService } from 'src/app/shared/service/preload.service';
import { Picture } from 'src/app/shared/model/picture.model';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.css'],
})
export class EditArtworkComponent implements OnInit {
  editForm: FormGroup;
  picture: Picture;

  isEdit: boolean = false;
  picId: number;
  previewURL: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private pictureService: PicturesService,
    private uploadService: UploadImageService,
    private preloadService: PreloadService,
    private _snackBar: SnackbarNotiService
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl(),
      artist: new FormControl(),
      price: new FormControl(),
      imageURL: new FormControl(),
      category: new FormControl(),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(150),
      ]),
    });

    this.activatedRoute.params.subscribe((params) => {
      this.picId = params['id'];

      if (this.picId) {
        this.isEdit = true;
        setTimeout(() => {
          this.preloadService.show();
        });

        this.pictureService.getPicById({ id: this.picId }).subscribe((pic) => {
          this.picture = {
            title: pic.title,
            id: pic.id,
            artist: pic.artist,
            price: pic.price,
            category: pic.category,
            description: pic.description,
            imageURL: pic.imageURL,
          };
          this.preloadService.hide();
          this.previewURL = this.picture.imageURL;
        });
      } else {
        this.picture = {
          title: '',
          artist: '',
          price: '',
          category: '',
          description: '',
          imageURL: '',
        };
      }
    });
  }

  onSubmit() {
    // this.uploadService.onUploadPicture(this.editForm.value);
    this.pictureService.onCreatePic(this.editForm.value)
  }

  preview(files: FileList) {
    this.uploadService.preview(files, 'content');
    this.uploadService.imageURLSubject.subscribe((url) => {
      this.previewURL = url;
    });
  }
}
