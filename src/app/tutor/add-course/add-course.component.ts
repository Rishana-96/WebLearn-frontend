import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('ghjk');
    this.firstFormGroup = this._formBuilder.group({
      courseName: ['', Validators.required],
      courseVideo: ['', Validators.required],
      courseVideoDescription: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      courseDescription: ['', Validators.required],
      courseFee: ['', Validators.required],
      courseEnrolledDate: ['', Validators.required],
      courseVideoDuration: ['', Validators.required],
    });
  }

  submitCourse() {
    console.log('heloo');
    if (this.firstFormGroup.valid && this.firstFormGroup.valid) {
      this._toastr.success('Course Added Successfully');
    } else {
      this._toastr.warning('course adding failed');
    }
  }
  deleteCourse() {}
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial'; // Variable to store file status
  file: File | null = null; // Variable to store file

  // On file Select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = 'initial';
      this.file = file;
    }
  }

  onUpload() {
    // we will implement this method later
  }
}
