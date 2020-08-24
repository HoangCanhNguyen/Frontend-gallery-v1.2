import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Picture } from 'src/app/shared/model/picture.model';
import { PicturesService } from 'src/app/shared/service/pictures.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() picture: Picture;

  constructor(private pictureService: PicturesService) { }

  ngOnInit(): void {
  }

}
