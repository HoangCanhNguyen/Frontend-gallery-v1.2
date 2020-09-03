import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/shared/service/user.service';

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
  imagePath: string;
  imageURL: any = null;

  selectedFile: File = null;
  downloadURL: Observable<string>;

  constructor(
    private authService: AuthenticateService,
    private storage: AngularFireStorage,
    private useService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((res) => {
      this.user = res;
      this.imageURL = this.user.avatarURL
    });
  }

  onSubmitShippingForm(form: NgForm): void {
    console.log(form);
  }

  preview(files) {
    var reader = new FileReader();
    this.selectedFile = files[0];
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    };
  }

  protected uploadFile(file) {
    const n = Date.now();
    const filePath = `UserAvatar/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              console.log(url);
              this.useService.onUploadAvatar({"avatarURL": url}).subscribe((res) => {
                this.authService.onGetUserInfo()
              })
            }
          });
        })
      )
      .subscribe();
  }
}
interface ID {
  id: string;
}
