import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetCarouselHeightService } from 'src/app/shared/service/getCarouselHeight.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PicturesService } from 'src/app/shared/service/pictures.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pic_info: any;
  pic_id: any;
  pic_name: any;
  pic_category: any;
  id_interface: pic_id;
  sub: Subscription;

  constructor(
    private getCarouselHeight: GetCarouselHeightService,
    private route: ActivatedRoute,
    private picService: PicturesService
  ) {}

  ngOnInit(): void {
    this.getCarouselHeight.getCarouselHeight(0);
    this.sub = this.route.params.subscribe((params: Params) => {
      this.pic_id = params.pic_id;
      this.pic_category = params.pic_category;
      this.pic_name = params.pic_name;
    });
    this.id_interface = {
      pic_id: this.pic_id,
    };
    this.pic_info = this.picService.getPicById(this.id_interface).subscribe(
      (res) => {
        this.pic_info = res;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

interface pic_id {
  pic_id: string;
}
