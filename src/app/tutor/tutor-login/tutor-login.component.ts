import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, CanActivateChildFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TutorService } from 'src/app/service/tutor.service';

@Component({
  selector: 'app-tutor-login',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.css']
})
export class TutorLoginComponent {
  id:any
  tutorLoginForm! : FormGroup;
  emailControl = new FormControl('',[Validators.required,Validators.email]);
  passwordControl = new FormControl('',[Validators.required])
  

  
  constructor(private fb:FormBuilder,
    private router:Router,
    private tutorService:TutorService,
    private toastr:ToastrService,
    private route:ActivatedRoute){}




 
  ngOnInit(): void {
   this.tutorLoginForm = this.fb.group({
    email:this.emailControl,
    password:this.passwordControl,
    
  
   })
   this.id = this.route.snapshot.paramMap.get('id')
   if(this.id){
     this.verifyTutor()
   }
  }
  
  verifyTutor(){
    this.tutorService.verifyTutor(this.id).subscribe(
      (result)=>{
        this.toastr.warning('please wait for admin approval and we will inform in your mail')
      },
      (err)=>{
        if(err.error.message){
          this.toastr.error(err.error.message);
        }else{
          this.toastr.error('something went wrong')
        }
      }
    )
  }

  tutorLogin(){
    if(this.tutorLoginForm.valid){
      const  user = this.tutorLoginForm.value;
       console.log(user);
       this.tutorService.tutorLogin(user).subscribe((res)=>{
        localStorage.setItem('tutorSecret', res.toString());
        this.toastr.warning('An email will be sent to your mail after Admin approval')
         
       },(err)=>{
         if(err.error.message){
           this.toastr.error(err.error.message);
         }else{
           this.toastr.error("something went wrong")
         }
       })
       
     }else{
       this.toastr.error('Something went wrong')
       
     }
  }




onLoginClick(){
  this.tutorLoginForm.markAllAsTouched();
}

}
