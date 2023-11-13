import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { Users } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'education',
    'email',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private _adminService: AdminService,
    private _toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadUserList();
  }
  loadUserList() {
    this._adminService.loadUsers().subscribe(
      (data: Users[]) => {
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Error fetching user list', error);
      }
    );
  }

  blockUser(id: string, name: string): void {
    this._adminService.blockUser(id).subscribe(
      (res) => {
        this._toastr.success('user blocked successfully');
        this.loadUserList();
      },
      (err) => {
        this._toastr.error('something went wrong');
      }
    );
  }

  unblockUser(id: string, name: string) {
    this._adminService.unblockUser(id).subscribe(
      (res) => {
        this._toastr.success('User unblocked successfully');
        this.loadUserList();
      },
      (err) => {
        this._toastr.error('something went wrong');
      }
    );
  }
}
