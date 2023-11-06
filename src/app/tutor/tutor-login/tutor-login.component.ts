import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, CanActivateChildFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TutorService } from 'src/app/service/tutor.service';

@Component({
  selector: 'app-tutor-login',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.css'],
})
export class TutorLoginComponent {
  id: any;
  tutorLoginForm!: FormGroup;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tutorService: TutorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tutorLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.verifyTutor();
    }
  }

  verifyTutor() {
    this.tutorService.verifyTutor(this.id).subscribe(
      (result) => {
        localStorage.setItem('tutorSecret', result.toString());
        this.router.navigate(['/tutor-login']);
      },
      (err) => {
        const errorMessage = err.error.message || 'Something went wrong';
        this.toastr.error(errorMessage);
      }
    );
  }

  tutorLogin() {
    if (this.tutorLoginForm.valid) {
      const tutor = this.tutorLoginForm.value;

      this.tutorService.tutorLogin(tutor).subscribe(
        (res) => {
          // Tutor application is approved
          localStorage.setItem('tutorSecret', res.toString());
          this.router.navigate(['/tutor/addCourse']);
        },
        (err) => {
          const errorMessage = err.error.message || 'Something went wrong';
          this.toastr.error(errorMessage);
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields.');
    }
  }
}
