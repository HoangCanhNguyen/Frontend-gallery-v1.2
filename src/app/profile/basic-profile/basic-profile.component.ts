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
    private uploadImageService: UploadImageService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((res) => {
      this.user = res;
      this.imageURL = this.user.avatarURL
    });

    this.uploadImageService.imageContentSubject.subscribe(content => {
      if (content === 'avatar') {
        this.uploadImageService.imageURLSubject.subscribe(res => {
          this.imageURL = res;
        })
      }
    })
  }

  onSubmitShippingForm(form: NgForm): void {
    console.log(form);
  }

  preview(files: FileList, content: string) {
    this.uploadImageService.preview(files, content);
  }

  uploadFile() {
    this.uploadImageService.uploadFile();
  }
}
interface ID {
  id: string;
}

