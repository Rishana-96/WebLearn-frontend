import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { TutorService } from 'src/app/service/tutor.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editMode: boolean = false;
  editdata: any;
  selectedProfilePicture: File | null = null;
  tutoredit: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _userService: UserService,
    private _tutorService: TutorService,
    private toastr: ToastrService
  ) {
    this.form = this._fb.group({
      name: new FormControl(this.data.name, Validators.required),
      email: new FormControl(this.data.email, Validators.required),
      education: new FormControl(this.data.education, Validators.required),
    });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    if (this.data.title != 'Tutor Edit') {
      this.form.setValue({
        name: this.data.name,
        email: this.data.email,
        education: this.data.education,
      });
    }
    console.log(this.form.getRawValue());
    if (this.data.title == 'Tutor Edit') {
      this.tutoredit = true;
      this.setTutorPopupdata();
    }
  }
  setTutorPopupdata() {
    this._tutorService.tutorDetails().subscribe((res) => {
      console.log(res);
      this.editdata = res;
      this.form.setValue({
        name: this.editdata.name,
        email: this.editdata.email,
        education: this.editdata.qualification,
      });
    });
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedProfilePicture = inputElement.files[0];
    }
  }

  Saveuser(): void {
    if (this.data.title == 'Tutor Edit') {
      const updatedData = this.form.value;
      this._tutorService.saveTutor(updatedData).subscribe(
        (response) => {
          this.toastr.success('Profile updated successfully');
          this.dialogRef.close({ updatedData: response });
        },
        (error) => {
          this.toastr.error('Failed to update profile. Please try again.');
        }
      );
    } else {
      if (this.form.valid) {
        const updatedData = this.form.value;
        // Save updated data using the service if needed
        this._userService.saveUser(updatedData).subscribe(
          (response) => {
            this.toastr.success('Profile updated successfully');
            this.dialogRef.close({ updatedData: response }); // Pass the updated data back to the parent component if needed
          },
          (error) => {
            this.toastr.error('Failed to update profile. Please try again.');
          }
        );
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
