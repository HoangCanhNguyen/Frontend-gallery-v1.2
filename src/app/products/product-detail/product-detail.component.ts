import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/shared/service/comment.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  pic_info: any = null;
  id: any;
  pic_name: any;
  pic_category: any;
  sub: Subscription;

  numComment: any = null;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
  ) {

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.sub = this.route.params.subscribe(() => {
      this.pic_info = this.route.snapshot.data.pictureByIdResolver;
    });
  }

  ngAfterViewInit(): void {
    this.commentService.getComment({ pic_id: this.id }).subscribe((res) => {
      this.numComment = res.length;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


