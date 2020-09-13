import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  preloadSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.preloadSubject.next(true);
  }

  hide() {
    this.preloadSubject.next(false);
  }
}
