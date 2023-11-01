import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor(private _router:Router,private _toastr:ToastrService){}

  userLog:boolean=false
  isMobile: boolean = false;
  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
    let token:string | null = localStorage.getItem('userSecret')
    
    if(token){
      this.userLog = true
    }
    
  }
  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 768;
  }

  logout(){
    localStorage.removeItem('userSecret')
    this._router.navigate(['/tutor/tutor-login'])
  }
  toggleMenu(){}

}
