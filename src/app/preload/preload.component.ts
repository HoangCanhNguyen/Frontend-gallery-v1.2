import { Component, OnInit } from '@angular/core';
import { PreloadService } from '../shared/service/preload.service';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.css']
})
export class PreloadComponent implements OnInit {
  showPreload = false;

  constructor(private preload: PreloadService) {
    this.preload.preloadSubject.subscribe(value => this.showPreload = value)
  }

  ngOnInit(): void {
  }

}
