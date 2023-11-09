import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      education: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }
  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  proceedRegistration() {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password !==
        this.registerForm.value.confirmPassword
      ) {
        this._toastr.error('Password and confirm password do not match');
        return;
      }
      const user = this.registerForm.value;

      this._userService.userRegister(user).subscribe(
        (result) => {
          this._router.navigate(['/verify']);
          this._toastr.success(
            'successfully registered,verify your email to continue login'
          );
        },
        (err) => {
          if (err.error.message) {
            this._toastr.error(err.error.message);
          } else {
            this._toastr.error('something went wrong');
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
