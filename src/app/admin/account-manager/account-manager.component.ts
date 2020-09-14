import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/shared/service/user.service';
import { PusherService } from 'src/app/shared/service/pusher.service';
import { RegisterNoti } from 'src/app/shared/model/register-noti.model';
import { VendorService } from 'src/app/shared/service/vendor.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css'],
})
export class AccountManagerComponent implements OnInit {
  @ViewChild('searchBox') searchBox: ElementRef;

  unconfirmedRegistration: RegisterNoti[] = [];
  registerSubcription: Subscription;

  headers = ['#', 'User Name', 'Email', 'Role', 'Status', 'Action'];
  account_list = [];

  filteredData = this.account_list;

  tabs = [
    { username: 'All users', active: true, filterContent: 'all' },
    {
      username: 'Pending email users',
      active: false,
      filterContent: 'pending email',
    },
    {
      username: 'Pending approval users',
      active: false,
      filterContent: 'pending approval',
    },
  ];

  searchContent: string = null;

  dropdownMenu = true;

  page = 1;
  pageSize = 4;

  constructor(
    private _pusherService: PusherService,
    private _userService: UserService,
    private _vendorService: VendorService,
    private _snackbar: SnackbarNotiService
  ) {}

  ngOnInit(): void {
    this._userService.onGetAllAccount().subscribe((res) => {
      this.account_list = res;
      this.filteredData = this.account_list;
    });
    this.registerSubcription = this._pusherService
      .getRegisterNoti()
      .subscribe((registration) => {
        this.account_list.unshift(registration);
      });
  }

  ngOnDestroy(): void {
    this.registerSubcription.unsubscribe();
  }

  getBgColor(status: string) {
    switch (status) {
      case 'pending email':
        return '#ecb403';
      case 'pending approval':
        return '#17a2b8';
      case 'denied':
        return '#dc0441';
      case 'approved':
        return '#4CAF50';
    }
  }

  tabActivated(tab, id: number) {
    tab.active = true;
    const inactiveTabs = this.tabs.filter((obj, index) => index !== id);
    inactiveTabs.forEach((tab) => {
      tab.active = false;
    });
  }

  filteredByDropdownMenu(dropdownType: string, content: string) {
    if (content === 'all') {
      this.filteredData = this.account_list;
      this.searchContent = null;
      return;
    }
    this.searchContent = content;
    switch (dropdownType) {
      case 'role':
        this.filteredData = this.account_list.filter((value) => {
          return value.role.toLowerCase() === content.toLowerCase();
        });
        break;
      case 'status':
        this.filteredData = this.account_list.filter((value) => {
          return value.status.toLowerCase() === content.toLowerCase();
        });
        break;
    }
  }

  filteredBySearchBox() {
    if (this.searchBox.nativeElement.value !== '') {
      this.filteredData = this.account_list.filter(
        (value) =>
          value.email
            .toLowerCase()
            .includes(this.searchBox.nativeElement.value.toLowerCase()) ||
          value.username
            .toLowerCase()
            .includes(this.searchBox.nativeElement.value.toLowerCase())
      );
      this.searchContent = this.searchBox.nativeElement.value;
    } else {
      this.filteredData = this.account_list;
    }
  }

  showDropdown(id: number) {
    if (id === 0) {
      this.dropdownMenu = true;
    } else {
      this.dropdownMenu = false;
    }
  }

  onApproveUser(data) {
    this._vendorService.onApprove({"id": data.id}).subscribe(
      (res) => {
        data.status = 'approved'
        this._snackbar.onSuccess("XÁC NHẬN")
      }
    )
  }

  onDeleteUser() {
    
  }
}
