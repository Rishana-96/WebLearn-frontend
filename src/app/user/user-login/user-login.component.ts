import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!:FormGroup;
  id:any

  constructor(private fb:FormBuilder,private userService:UserServiceService,private router:Router,private toastr:ToastrService,private route : ActivatedRoute){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })

    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      this.verifyUser()
    }
  }

  proceedLogin(){
    if(this.loginForm.valid){
      const  user = this.loginForm.value;
       console.log(user);
       this.userService.userLogin(user).subscribe((res)=>{
        localStorage.setItem('userSecret', res.toString());
        this.router.navigate(['/'])
         
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

  verifyUser(){
    this.userService.verifyUser(this.id).subscribe(
      (result)=>{
        localStorage.setItem('userSecret',result.toString());
        this.router.navigate(['/'])
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


}
