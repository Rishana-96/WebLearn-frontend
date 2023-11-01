import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminService } from 'src/app/service/admin.service';
import { environment } from 'src/environments/environment.development';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'qualification', 'email', 'cv','status','action'];
  dataSource: MatTableDataSource<any> 
  
  pdfLoaded:boolean=false
  test : any

  constructor(
     private adminService:AdminService,
     private sanitizer: DomSanitizer,
     private toastr:ToastrService,
     private dialog:MatDialog,
     private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
     ){
    this.dataSource = new MatTableDataSource<any>([])
  }
  ngOnInit(): void {
    this.loadApprovedTutors()
  }

  loadApprovedTutors() {
    this.adminService.loadApprovedTutors().subscribe(
      (data: any[]) => {
        //console.log(data)
        
        //filter approved tutors
        this.test = data.map(tutor =>({
          id:tutor._id,
          name:tutor.name,
          qualification:tutor.qualification,
          email:tutor.email,
          cv:tutor.cv,
          is_blocked:tutor.is_blocked
        }))
        this.dataSource = new MatTableDataSource(this.test);
      
        
        
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

  blockTutor(element: any): void {
    if (element && element.id) {
      
      
      const tutorId: string = element.id.toString();
      this.adminService.blockTutor(tutorId).subscribe(
        (response) => {
          
          console.log(response);
          this.toastr.success("Tutor blocked successfully");
        
          this.loadApprovedTutors();
        },
        (error) => {
          this.toastr.error("Something went wrong while blocking the tutor");
          console.error('Error blocking tutor:', error);
        }
      );
    } else {
      console.error('Invalid or undefined element or element.id');
    }
  }
  

  unblockTutor(element: any): void {
    console.log(element);
    
    if (element && element.id) {
      const tutorId: string = element.id.toString();
      this.adminService.unblockTutor(tutorId).subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Tutor unblocked successfully");
          this.loadApprovedTutors();
        },
        (error) => {
          this.toastr.error("Something went wrong while blocking the tutor");
          console.error('Error blocking tutor:', error);
        }
      );
    } else {
      console.error('Invalid or undefined element or element.id');
    }
  }

// unblockTutor(element:any): void {
//     this.adminService.unblockTutor(element).subscribe((response) => {
//         this.toastr.success("tutor unblocked successfully");
//         this.loadApprovedTutors();
//     }, (error) => {
//         this.toastr.error("something went wrong");
//     });
// }


 
  
}
