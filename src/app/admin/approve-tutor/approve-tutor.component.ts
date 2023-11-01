import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../../app/service/admin.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-approve-tutor',
  templateUrl: './approve-tutor.component.html',
  styleUrls: ['./approve-tutor.component.css']
})
export class ApproveTutorComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'qualification', 'email','pdf','action'];
  dataSource: MatTableDataSource<any> 
  
  pdfLoaded:boolean=false
  test : any;
  isLoading: boolean = false;

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
        console.error('Error fetching tutor list', error);
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
    this.isLoading = true;
    this.adminService.approveTutor(tutorId,status).subscribe(
      (response)=>{
        this.toastr.success('Tutor approved,An email will be sent to your Mail')
        this.loadTutorList()
        
      },(error)=>{
        this.toastr.error('Error approving tutor:'+error.message)
      },()=>{
        this.isLoading = false;
      }
    )
  }
  rejectTutor(tutorId:string,status:string):void{
  
 
    this.dialog.open(DialogComponent,{
      width:"50%",
      height:"300px",
      data:{
        tutorId,
        title:"reject approval"
      }
    })
  }



}
