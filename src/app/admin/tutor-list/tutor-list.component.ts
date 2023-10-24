import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminService } from 'src/app/service/admin.service';
import { environment } from 'src/environments/environment.development';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'qualification', 'email','pdf', 'action'];
  dataSource: MatTableDataSource<any> 
  
  pdfLoaded:boolean=false
  test : any

  constructor(
     private adminService:AdminService,
     private sanitizer: DomSanitizer,
     private toastr:ToastrService,
     private dialog:MatDialog
     ){
    this.dataSource = new MatTableDataSource<any>([])
  }
  ngOnInit(): void {
    this.loadTutorList()
  }

  loadTutorList() {
    this.adminService.loadTutors().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.test=data
        console.log(this.test);
        
      },
      error => {
        console.error('Error fetching user list', error);
      }
    );
  }

  openCv(cv:string){
    if(cv){
    this.dialog.open(DialogComponent,{
      width:"80%",
      height:"700px",
      data:{
        cvUrl:cv
      }
    })
  }else{
    console.error('Invalid CV URL');
    
  }
    
  }

  getPdf(file: string): SafeResourceUrl {
    const url = `${environment.User_API_Key}/files/${file}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  approveTutor(tutorId:string,status:string):void{
  
    this.adminService.approveTutor(tutorId,status).subscribe(
      (response)=>{
        this.toastr.success('Tutor approved')
        this.loadTutorList()
        
      }
    )
  }
  rejectTutor(tutorId:string,status:string):void{
  
    // this.adminService.rejectTutor(tutorId,status).subscribe(
    //   (response)=>{
    //     this.toastr.success('Tutor rejected')
    //     this.loadTutorList()
        
    //   }
    // )

    this.dialog.open(DialogComponent,{
      width:"50%",
      height:"300px",
      data:{
        tutorId,
        title:"reject approval"
      }
    })
  }

  blockTutor(){

  }
}
