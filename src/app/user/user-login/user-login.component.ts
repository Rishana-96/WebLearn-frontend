import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { strongPasswordValidator } from '../../strongPassword';
import { Users } from '../../interfaces/interfaces';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  id: any;
  hide: boolean = true;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _toastr: ToastrService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
    });

    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.verifyUser();
    }
  }

  proceedLogin() {
    if (this.loginForm.valid) {
      const user: Users = this.loginForm.value;
      this._userService.userLogin(user).subscribe(
        (res) => {
          localStorage.setItem('userSecret', res.toString());
          this._router.navigate(['/']);
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
      this._toastr.error('Something went wrong');
    }
  }
  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  verifyUser() {
    this._userService.verifyUser(this.id).subscribe(
      (result) => {
        localStorage.setItem('userSecret', result.toString());
        this._router.navigate(['/']);
      },
      (err: { error: { message: string | undefined } }) => {
        if (err.error.message) {
          this._toastr.error(err.error.message);
        } else {
          this._toastr.error('something went wrong');
        }
      }
    );
  }
}
