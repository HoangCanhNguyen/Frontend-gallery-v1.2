import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/service/user.service';
@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css'],
})
export class AccountManagerComponent implements OnInit, AfterViewInit {
  displayedColumns = ['position', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource<Account>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.userService.onGetAllAccount().subscribe((res) => {
      this.dataSource = res
    });
    this.dataSource.paginator = this.paginator;
  }

}
export interface Account {
  username: string;
  email: number;
  role: string;
  id: string;
  activated: boolean;
}
