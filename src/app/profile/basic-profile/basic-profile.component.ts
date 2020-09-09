import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/shared/service/user.service';
import { UploadImageService } from 'src/app/shared/service/upload-image.service'

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.css'],
})
export class BasicProfileComponent implements OnInit {
  // profilePhotoLink: string = null;
  sub: Subscription;
  id: ID;

  user: any = null;
  // imagePath: string;
  imageURL: any = null;

  selectedFile: File = null;
  downloadURL: Observable<string>;

  constructor(
    private authService: AuthenticateService,
    private storage: AngularFireStorage,
    private useService: UserService,
    private uploadImageService: UploadImageService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((res) => {
      this.user = res;
      this.imageURL = this.user.avatarURL
    });

    this.uploadImageService.imageURLSubject.subscribe(res => {
      this.imageURL = res;
    })

    this.uploadImageService.selectedFileSubject.subscribe(res => {
      this.selectedFile = res;
    })
  }

  onSubmitShippingForm(form: NgForm): void {
    console.log(form);
  }

  preview(files) {
    this.uploadImageService.preview(files);
  }

  uploadFile() {
    this.uploadImageService.uploadFile();
  }
}
interface ID {
  id: string;
}
