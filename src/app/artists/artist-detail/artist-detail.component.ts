import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { VendorService } from 'src/app/shared/service/vendor.service';
import { VendorModel } from 'src/app/shared/model/vendor.model';
import { UploadImageService } from 'src/app/shared/service/upload-image.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { PicturesService } from 'src/app/shared/service/pictures.service';
@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  sub: Subscription;

  artist_name: string;
  _id: string;

  vendor: VendorModel;
  pic_list: imageResponse[] = []

  constructor(
    private route: ActivatedRoute,
    private _uploadService: UploadImageService,
    private _snackBar: SnackbarNotiService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.artist_name = params.artist_name;
      this.vendor = this.route.snapshot.data.vendorDetailsResolver;
      if (this.vendor.role == 'collector') {
        this.vendor.role = 'Nhà sư tầm';
      } else {
        this.vendor.role = 'Họa sĩ';
      };
      this.pic_list = this.route.snapshot.data.vendorPicsResolver
    })
      ;
  }

  onUploadAvatar(event) {
    this._uploadService
      .onUploadAvatar(event.target.files[0])
      .then((resolve) => {
        this.vendor.avatarURL = resolve.toString();
        this._snackBar.onSuccess('CẬP NHẬT ẢNH');
      });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
}
interface imageResponse {
  id: string,
  imageURL: string,
  title: string,
  category: string
}