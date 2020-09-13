import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
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
export class AccountManagerComponent implements OnInit {
  @ViewChild('searchBox') searchBox: ElementRef

  unconfirmedRegistration: RegisterNoti[] = [];
  registerSubcription: Subscription;

  headers = ['#', 'User Name', 'Email', 'Role', 'Status', 'Action'];
  mockData = [
    { name: 'Spiderman', email: 'spiderman@gmail.com', role: 'User', status: 'Pending Email' },
    { name: 'Thor', email: 'thor@gmail.com', role: 'Artist', status: 'Pending Approval' },
    { name: 'Hulk', email: 'hulk@gmail.com', role: 'User', status: 'Approved' },
    { name: 'Tony Stark', email: 'tony@gmail.com', role: 'Collector', status: 'Pending Approval' },
    { name: 'Captain America', email: 'captain_america@gmail.com', role: 'User', status: 'Denied' },
    { name: 'Natasha', email: 'natasha@gmail.com', role: 'Artist', status: 'Approved' },
    { name: 'Superman', email: 'superman@gmail.com', role: 'User', status: 'Pending Email' },
    { name: 'Banner', email: 'banner@gmail.com', role: 'Artist', status: 'Pending Approval' },
    { name: 'Black Widow', email: 'black_widow@gmail.com', role: 'User', status: 'Approved' },
    { name: 'Vision', email: 'vision@gmail.com', role: 'Collector', status: 'Pending Approval' },
    { name: 'Groot', email: 'groot@gmail.com', role: 'User', status: 'Denied' },
    { name: 'Loki', email: 'loki@gmail.com', role: 'Artist', status: 'Approved' },
    { name: 'Drax', email: 'drax@gmail.com', role: 'User', status: 'Pending Email' },
    { name: 'Captain Marvel', email: 'captain_marvel@gmail.com', role: 'Artist', status: 'Pending Approval' },
    { name: 'Black Panther', email: 'panther@gmail.com', role: 'User', status: 'Approved' },
    { name: 'Ant Man', email: 'ant_man@gmail.com', role: 'Collector', status: 'Pending Approval' },
    { name: 'Winter Soldier', email: 'winter_soldier@gmail.com', role: 'User', status: 'Denied' },
    { name: 'Doctor Strange', email: 'doctor_strange@gmail.com', role: 'Artist', status: 'Approved' },
  ]

  filteredData = this.mockData;

  tabs = [
    { name: 'All users', active: true, filterContent: 'all' },
    { name: 'Pending email users', active: false, filterContent: 'pending email' },
    { name: 'Pending approval users', active: false, filterContent: 'pending approval' }
  ];

  searchContent: string = null

  dropdownMenu = true;

  page = 1;
  pageSize = 4;

  constructor(
    private _pusherService: PusherService
  ) { }

  ngOnInit(): void {
    this.registerSubcription = this._pusherService
      .getRegisterNoti()
      .subscribe((registration) => {
        this.unconfirmedRegistration.push(registration);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.registerSubcription.unsubscribe()
  }

  getBgColor(status: string) {
    switch (status) {
      case 'Pending Email':
        return '#ecb403';
      case 'Pending Approval':
        return '#17a2b8';
      case 'Denied':
        return '#dc0441';
      case 'Approved':
        return '#4CAF50';
    }
  }

  tabActivated(tab, id: number) {
    tab.active = true
    const inactiveTabs = this.tabs.filter((obj, index) => index !== id);
    inactiveTabs.forEach(tab => {
      tab.active = false
    })
  }

  filteredByDropdownMenu(dropdownType: string, content: string) {
    if (content === 'all') {
      this.filteredData = this.mockData;
      this.searchContent = null;
      return
    }
    this.searchContent = content
    switch (dropdownType) {
      case 'role':
        this.filteredData = this.mockData.filter(value => {
          return value.role.toLowerCase() === content.toLowerCase()
        })
        break;
      case 'status':
        this.filteredData = this.mockData.filter(value => {
          return value.status.toLowerCase() === content.toLowerCase()
        })
        break;
    }
  }

  filteredBySearchBox() {
    if (this.searchBox.nativeElement.value !== '') {
      this.filteredData = this.mockData.filter(value => value.email.toLowerCase().includes(this.searchBox.nativeElement.value
        .toLowerCase()) || value.name.toLowerCase().includes(this.searchBox.nativeElement.value.toLowerCase()));
      this.searchContent = this.searchBox.nativeElement.value
    } else {
      this.filteredData = this.mockData
    }

  }

  showDropdown(id: number) {
    if (id === 0) {
      this.dropdownMenu = true;
    } else {
      this.dropdownMenu = false
    }
  }
}

export interface Account {
  username: string;
  email: number;
  role: string;
  id: string;
  activated: boolean;
}
