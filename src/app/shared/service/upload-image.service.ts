import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthenticateService } from './authenticate.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  selectedFile: File;

  downloadURL: Observable<string>;

  imageURLSubject = new Subject<any>();
  selectedFileSubject = new Subject<File>();

  constructor(
    private authService: AuthenticateService,
    private storage: AngularFireStorage,
    private useService: UserService,
  ) { }

  preview(files) {
    var reader = new FileReader();
    this.selectedFile = files[0];
    this.selectedFileSubject.next(this.selectedFile);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageURLSubject.next(reader.result);
    }
  }

  uploadFile() {
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
              this.useService.onUploadAvatar({ "avatarURL": url }).subscribe((res) => {
                this.authService.onGetUserInfo()
              })
            }
          });
        })
      )
      .subscribe();
  }
}
