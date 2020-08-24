import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.css']
})
export class ArtistInfoComponent implements OnInit {

  @Input() artist: any

  constructor() { }

  ngOnInit(): void {
  }

}
