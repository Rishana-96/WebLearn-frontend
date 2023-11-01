import { Component } from '@angular/core';
interface Instructor {
  id: number;
  name: string;
  courseName:string;
  imagePath: string;
}

@Component({
  selector: 'app-tutor-home',
  templateUrl: './tutor-home.component.html',
  styleUrls: ['./tutor-home.component.css']
})
export class TutorHomeComponent {

  
  instructors: Instructor[] = [
    { id: 1, name: 'Murilo Souza', courseName:'Web Development', imagePath: 'instructor3.jpg' },
    { id: 2, name: 'Murilo Souza', courseName:'Business', imagePath: 'instructor2.jpg' },
    { id: 1, name: 'Murilo Souza', courseName:'Personal Development',  imagePath: 'instructor3.jpg' },
    { id: 2, name: 'Murilo Souza', courseName:'Communication Trainer', imagePath: 'instructop4.jpg' },
    { id: 1, name: 'Murilo Souza', courseName:'Data Science', imagePath: 'instructor5.jpeg' },
    { id: 2, name: 'Murilo Souza', courseName:'Photography', imagePath: 'instructor6.jpg' },
    // Add more courses as needed
  ];
}
