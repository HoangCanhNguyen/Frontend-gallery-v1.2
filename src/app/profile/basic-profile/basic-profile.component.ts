import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

declare var ImageCompressor: any;

const compressor = new ImageCompressor();

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
    private route: ActivatedRoute,
    private authService: AuthenticateService,
    private storage: AngularFireStorage,
    private zone: NgZone
  ) {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = { id: params.id };
    });
  }

  ngOnInit(): void {
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

  // onUploadAvatar(event): void {
  //   this.zone.runOutsideAngular(() => {
  //     const promises: Promise<Blob>[] = [];
  //     promises.push(compressor.compress(this.selectedFile, { quality: 0.5 }));

  //     Promise.all(promises).then(_file => this.uploadFile(_file));
  //   });
  // }

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
