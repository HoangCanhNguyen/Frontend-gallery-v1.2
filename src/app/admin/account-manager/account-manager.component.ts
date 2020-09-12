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
export class AccountManagerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchBox') searchBox: ElementRef

  displayedColumns = ['position', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource<Account>();

  unconfirmedRegistration: RegisterNoti[] = [];
  registerSubcription: Subscription;

  headers = ['#', 'User Name', 'Email', 'Role', 'Status', 'Action'];
  mockData = [
    { id: 1, name: 'Spiderman', email: 'tuananhngyen218@gmail.com', role: 'User', status: 'Pending Email' },
    { id: 2, name: 'Thor', email: 'thor@gmail.com', role: 'Artist', status: 'Pending Approval' },
    { id: 3, name: 'Hulk', email: 'hulk@gmail.com', role: 'User', status: 'Approved' },
    { id: 4, name: 'Tony Stark', email: 'tony@gmail.com', role: 'Collector', status: 'Pending Approval' },
    { id: 5, name: 'Captain America', email: 'captain@gmail.com', role: 'User', status: 'Denied' },
    { id: 6, name: 'Natasha', email: 'natasha@gmail.com', role: 'Artist', status: 'Approved' },
  ]

  filteredData = this.mockData;

  tabs = [
    { name: 'All users', active: true, filterContent: 'all' },
    { name: 'Pending email users', active: false, filterContent: 'pending email' },
    { name: 'Pending approval users', active: false, filterContent: 'pending approval' }
  ];

  dropdownMenu = true;

  constructor(
    private userService: UserService,
    private _pusherService: PusherService
  ) { }

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
      return
    }
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
        .toLowerCase()) || value.name.toLowerCase().includes(this.searchBox.nativeElement.value.toLowerCase()))
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
