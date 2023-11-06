import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  proceedLogin() {
    if (this.loginForm.valid) {
      const admin = this.loginForm.value;
      console.log(admin);
      this.adminService.adminLogin(admin).subscribe(
        (res) => {
          localStorage.setItem('adminSecret', res.toString());
          this.router.navigate(['/admin/dashboard']);
        },
        (err) => {
          if (err.error.message) {
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error('something went wrong');
          }
        }
      );
    } else {
      this.toastr.error('Something went wrong');
    }
  }
}
