import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'education', 'email', 'status', 'action'];
  dataSource: MatTableDataSource<any> 

  
  
  constructor(
    private adminService:AdminService,
    private toastr:ToastrService,

    ){
    this.dataSource = new MatTableDataSource<any>([])
  }

  ngOnInit(): void {
    this.loadUserList();
    
  }
  loadUserList() {
    this.adminService.loadUsers().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error => {
        console.error('Error fetching user list', error);
      }
    );
  }
  

  



  blockUser(id:string,name:string):void {

    this.adminService.blockUser(id).subscribe((res)=>
    {
      this.toastr.success("user blocked successfully")
      this.loadUserList()
    },
    (err)=>{
      this.toastr.error("something went wrong")
    })
  }

  unblockUser(id:string,name:string) {
    this.adminService.unblockUser(id).subscribe((res)=>{
            this.toastr.success("User unblocked successfully")
            this.loadUserList()
    },
    (err)=>{
         this.toastr.error("something went wrong")
    })
    
  }
}
