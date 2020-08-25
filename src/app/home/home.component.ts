import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { GetCarouselHeightService } from '../shared/service/getCarouselHeight.service';
import { Router } from '@angular/router';
import { PicturesService } from '../shared/service/pictures.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  new_pic_list: any = [];

  selectedFile: File = null;
  fb: string;
  downloadURL: Observable<string>;

  constructor(
    private getCarouselHeight: GetCarouselHeightService,
    private router: Router,
    private picServivce: PicturesService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    document.getElementById('fixed').classList.add('fixed-top');
    document.getElementById('fixed').classList.remove('sticky');
    // this.picServivce.getNewPics().subscribe(pic => {
    //   this.new_pic_list = pic;
    // });
  }

  ngAfterViewInit(): void {
    const imageHeight = window.innerHeight;
    this.getCarouselHeight.getCarouselHeight(imageHeight);
  }
}
