import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm!:FormGroup;



constructor(private fb:FormBuilder,private userService:UserServiceService,private router:Router,private toastr:ToastrService){}
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      name:['',Validators.required],
      education:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }



  proceedRegistration(){
    if(this.registerForm.valid){
     const  user = this.registerForm.value;
      console.log(user);
      this.userService.userRegister(user).subscribe((result)=>{
        this.router.navigate(['/verify']);
        this.toastr.success("successfully registered,verify your email to continue login")
        
      },(err)=>{
        if(err.error.message){
          this.toastr.error(err.error.message);
        }else{
          this.toastr.error("something went wrong")
        }
      })
      
    }else{
      console.log('Form is invalid');
      
    }

  }

}