import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-nav',
  templateUrl: './tutor-nav.component.html',
  styleUrls: ['./tutor-nav.component.css']
})
export class TutorNavComponent implements OnInit{
 
  tutorLog:boolean=false
  constructor(private _router:Router){}

  ngOnInit(): void {
     let token:string | null = localStorage.getItem('tutorSecret');
     if(token){
      this.tutorLog = true
    }
  }
  logout(){
    localStorage.removeItem('tutorSecret')
    this._router.navigate(['/tutor/tutor-login'])
  }
}
