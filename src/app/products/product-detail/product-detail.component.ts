import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  id: any;
  pic_name: any;
  pic_category: any;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private picService: PicturesService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.pic_category = params.pic_category;
      this.pic_name = params.pic_name;
    });
    this.pic_info = this.picService.getPicById({"id": this.id}).subscribe(
      (res) => {
        this.pic_info = res;
      }
    );
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


