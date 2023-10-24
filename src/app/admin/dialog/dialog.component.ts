import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  cvUrl:SafeResourceUrl;
  inputData :any
  cv:any
  form:FormGroup
  rejectApproval:boolean=false

  constructor(private ref:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private sanitizer:DomSanitizer,
    private fb:FormBuilder
    ){
    this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.cvUrl)
    this.form=this.fb.group({
      reason:['',[Validators.required]]
    })
  }


  ngOnInit(): void {
    this.inputData = this.data
    if(this.inputData.title == 'reject approval'){
      this.rejectApproval = true 
    }else{
      this.setPdf()
    }
    console.log(this.inputData);
    
  }

  closeDialog(){
    this.ref.close();
  }

  setPdf(){
    this.getPdf(this.inputData.cvUrl)
  }

  getPdf(file: string) {
    const url = `${environment.User_API_Key}/files/${file}`;
    this.cv =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
