import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesService } from '../shared/service/pictures.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  new_pic_list: any = [];

  selectedFile: File = null;
  fb: string;
  downloadURL: Observable<string>;

  @ViewChild('carousel') el: any;

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  constructor(
    private router: Router,
    private picServivce: PicturesService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  // add swipe gesture on mobile devices for carousel
  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        if (swipe === 'next') {
          this.el.nextSlide()
        } else if (swipe === 'previous') {
          this.el.previousSlide()
        }
      }
    }
  }
}