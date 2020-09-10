import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PicturesService } from 'src/app/shared/service/pictures.service';
import { CommentService } from 'src/app/shared/service/comment.service';
import { PreloadService } from 'src/app/shared/service/preload.service';

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

  numComment: any

  constructor(
    private route: ActivatedRoute,
    private picService: PicturesService,
    private commentService: CommentService,
    private preloadService: PreloadService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.preloadService.show()
    })


    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.pic_category = params.pic_category;
      this.pic_name = params.pic_name;
    });
    this.pic_info = this.picService.getPicById({ "id": this.id }).subscribe(
      (res) => {
        this.pic_info = res;
        this.preloadService.hide()
      }
    );

    this.commentService.getComment({ pic_id: this.id }).subscribe((res) => {
      this.numComment = res.length
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


