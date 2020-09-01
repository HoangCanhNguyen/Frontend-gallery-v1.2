import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  imageURL: string = "https://cdn.singulart.com/artists/v2/pictures/cropped/studio/base/1686_studio_d84dd1b5ae4f4c05d126dd48f8177b4d.jpeg";

  constructor() { }

  ngOnInit(): void {
  }

}
