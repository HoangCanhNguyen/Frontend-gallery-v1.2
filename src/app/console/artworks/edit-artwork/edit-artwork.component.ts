import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _snackBar: SnackbarNotiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
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
          this.previewURL = this.picture.imageURL;
          this.preloadService.hide();
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
        this.picId = 0;
      }
    });
    this.editForm = new FormGroup({
      id: new FormControl(this.picId.toString()),
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
  }

  preview(files: FileList) {
    this.uploadService.preview(files, 'content');
    this.uploadService.imageURLSubject.subscribe((url) => {
      this.previewURL = url;
    });
  }

  onSubmit() {
    if (!this.isEdit) {
      this.uploadService.onUpload(this.editForm.value, 'Picture').then(() => {
        this.pictureService.onCreatePic(this.editForm.value).subscribe(() => {
          this._snackBar.onSuccess('TẠO SẢN PHẨM');
          this._router.navigate(['/console/artworks']);
        });
      });
    } else {
      this.uploadService.imageURLSubject.subscribe(
        (url) => {
          this.previewURL = url
        }
      )
      if (this.previewURL) {
        console.log('co anh');
        this.uploadService
          .onUpload(this.editForm.value, 'Picture')
          .then(() => {
            this.pictureService
              .onEditPic(this.editForm.value)
              .subscribe(() => {
                this._snackBar.onSuccess('CẬP NHẬT');
                this._router.navigate(['/console/artworks']);
              });
          });
      } else {
        console.log('ko anh');
        this.pictureService.onEditPic(this.editForm.value).subscribe(() => {
          this._snackBar.onSuccess('CẬP NHẬT');
          this._router.navigate(['/console/artworks']);
        });
      }
    }
  }
}
