import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';
//import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/admin/dialog/dialog.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  name!: string;
  email!: string;
  //img!: CloudinaryImage;
  constructor(
    private _userService: UserServiceService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._userService.userDetails().subscribe(
      (res) => {
        this.name = res.name;
        this.email = res.email;
      },
      (err) => {
        if (err.error.message) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('something went wrong');
        }
      }
    );
    // Create a Cloudinary instance, setting some Cloud and URL configuration parameters.
    // const cld = new Cloudinary({
    //   cloud: {
    //     cloudName: 'user_profile',
    //   },
    // });

    // cld.image returns a CloudinaryImage with the configuration set.
    // this.img = cld.image('sample');
  }
  editProfile(): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '40%',
      height: '350px',
      data: {
        title: 'User Edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.updatedData) {
        this.name = result.updatedData.name;
        this.email = result.updatedData.email;
        this.toastr.success('Profile updated successfully');
      }
    });
  }
}
