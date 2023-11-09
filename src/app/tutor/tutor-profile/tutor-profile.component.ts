import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from '../../modal/popup/popup.component';
import { TutorService } from '../../service/tutor.service';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css'],
})
export class TutorProfileComponent implements OnInit {
  name: string = ''; // Add this line to define the property
  email: string = ''; // Add this line to define the property
  qualification: string = ''; // Add this line to define the property
  constructor(
    private _tutorService: TutorService,
    private _toastr: ToastrService,
    private _matDialog: MatDialog,
    private _fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this._tutorService.tutorDetails().subscribe(
      (res) => {
        console.log(res);
        this.name = res.name;
        this.qualification = res.qualification;
        this.email = res.email;
      },
      (error) => {
        if (error.error.message) {
          this._toastr.error(error.error.message);
        } else {
          this._toastr.error('Something went wrong');
        }
      }
    );
  }

  editProfile() {
    const dialogRef = this._matDialog.open(PopupComponent, {
      width: '50%',
      height: '550px',
      data: {
        title: 'Tutor Edit',
        name: this.name,
        email: this.email,
        qualification: this.qualification,
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
