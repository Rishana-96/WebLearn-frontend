import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TutorService } from 'src/app/service/tutor.service';

@Component({
  selector: 'app-tutor-sign-up',
  templateUrl: './tutor-sign-up.component.html',
  styleUrls: ['./tutor-sign-up.component.css']
})
export class TutorSignUpComponent implements OnInit {
  
  cvFile !: File 
  tutorSignupForm!: FormGroup;
  invalidFile: boolean = false;
  
  
  constructor(private fb: FormBuilder, private toastr: ToastrService, private tutorService: TutorService, private router: Router) { }

  ngOnInit(): void {
    this.tutorSignupForm = this.fb.group({
      name: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  tutorRegistration(): void {
    if (this.tutorSignupForm.valid && !this.invalidFile) {
      alert('hi')
      const form = new FormData()

      const tutor = this.tutorSignupForm.value;
      form.append("cv",this.cvFile,this.cvFile.name)
      form.append("name",tutor.name)
      form.append("qualification",tutor.qualification)
      form.append("email",tutor.email)
      form.append("password",tutor.password)

      this.tutorService.tutorSignup(form).subscribe(
        (res) => {
          this.router.navigate(['/tutor/verify']);
          this.toastr.success('please verify you email');
        },
        (error) => {
          if(error.err.message){
            this.toastr.error(error.err.message);
          }else{
            this.toastr.error('Registration failed. Please try again.');
          }
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly and upload a valid PDF file.');
    }
  }

  onCVFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.cvFile = inputElement.files[0];
      const allowedExtensions = ['pdf'];
      const fileName = this.cvFile.name.toLowerCase();
      
      if (!fileName.endsWith('.pdf') || !allowedExtensions.includes(fileName.split('.').pop()!)) {
        this.invalidFile = true;
      } else {
        this.invalidFile = false;
      }
    }
  }
}
