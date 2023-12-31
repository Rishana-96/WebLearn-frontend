import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../modal/popup/popup.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  name: string = ''; // Add this line to define the property
  email: string = ''; // Add this line to define the property
  education: string = ''; // Add this line to define the property
  constructor(
    private _userService: UserService,
    private _toastr: ToastrService,
    private _matDialog: MatDialog,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._userService.userDetails().subscribe(
      (res) => {
        this.name = res.name;
        this.email = res.email;
        this.education = res.education;
      },
      (err) => {
        if (err.error.message) {
          this._toastr.error(err.error.message);
        } else {
          this._toastr.error('Something went wrong');
        }
      }
    );
  }
  editProfile(): void {
    const dialogRef = this._matDialog.open(PopupComponent, {
      width: '50%',
      height: '550px',
      data: {
        title: 'User Edit',
        editMode: true, // Pass the editMode property to PopupComponent},
        name: this.name,
        email: this.email,
        education: this.education,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.updatedData) {
        this.ngOnInit();
        this._toastr.success('Profile updated successfully');
      }
    });
  }
}
