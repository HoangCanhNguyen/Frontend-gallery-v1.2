import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/shared/service/user.service';
import { PusherService } from 'src/app/shared/service/pusher.service';
import { RegisterNoti } from 'src/app/shared/model/register-noti.model';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css'],
})
export class AccountManagerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['position', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource<Account>();

  unconfirmedRegistration: RegisterNoti[] = [];
  registerSubcription: Subscription;

  constructor(
    private userService: UserService,
    private _pusherService: PusherService
  ) {}

  ngOnInit(): void {
    this.registerSubcription = this._pusherService
      .getRegisterNoti()
      .subscribe((registration) => {
        this.unconfirmedRegistration.push(registration);
      });
  }

  ngAfterViewInit(): void {
    this.userService.onGetAllAccount().subscribe((res) => {
      this.dataSource = res;
    });
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.registerSubcription.unsubscribe()
  }
}

export interface Account {
  username: string;
  email: number;
  role: string;
  id: string;
  activated: boolean;
}
