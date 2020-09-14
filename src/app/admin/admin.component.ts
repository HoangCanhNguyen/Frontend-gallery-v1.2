import { Component, OnInit } from '@angular/core';
import { PusherService } from '../shared/service/pusher.service';
import { VendorService } from '../shared/service/vendor.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isOpened = true;

  isRegisterNoti: boolean = false;
  PendingNum: number;

  constructor(
    private _pusher: PusherService,
    private _VendorService: VendorService
  ) {}

  ngOnInit(): void {
    this._pusher.getRegisterNoti().subscribe((noti) => {
      this.isRegisterNoti = true;
      this.PendingNum += 1;
    });
  }
  ngAfterViewInit(): void {
    this._VendorService.onGetPendingAccount().subscribe((num) => {
      this.PendingNum = num;
    });
  }
}
