import { Component } from '@angular/core';
interface Instructor {
  id: number;
  name: string;
  courseName: string;
  imagePath: string;
}
interface Course {
  id: number;
  name: string;
  amount: number;
  imagePath: string;
}
@Component({
  selector: 'app-tutor-home',
  templateUrl: './tutor-home.component.html',
  styleUrls: ['./tutor-home.component.css'],
})
export class TutorHomeComponent {
  courses: Course[] = [
    {
      id: 1,
      name: 'Course Name 1',
      amount: 50,
      imagePath: 'assets/home/course1.jpg',
    },
    {
      id: 2,
      name: 'Course Name 2',
      amount: 60,
      imagePath: 'assets/home/course2.jpg',
    },
    {
      id: 1,
      name: 'Course Name 1',
      amount: 50,
      imagePath: 'assets/home/course3.jpg',
    },
    {
      id: 2,
      name: 'Course Name 2',
      amount: 60,
      imagePath: 'assets/home/course4.jpg',
    },
    {
      id: 1,
      name: 'Course Name 1',
      amount: 50,
      imagePath: 'assets/home/course5.jpg',
    },
    {
      id: 2,
      name: 'Course Name 2',
      amount: 60,
      imagePath: 'assets/home/course6.jpg',
    },
    // Add more courses as needed
  ];
  instructors: Instructor[] = [
    {
      id: 1,
      name: 'Murilo Souza',
      courseName: 'Web Development',
      imagePath: 'assets/home/instructor3.jpg',
    },
    {
      id: 2,
      name: 'Murilo Souza',
      courseName: 'Business',
      imagePath: 'assets/home/instructor2.jpg',
    },
    {
      id: 1,
      name: 'Murilo Souza',
      courseName: 'Personal Development',
      imagePath: 'assets/home/instructor3.jpg',
    },
    {
      id: 2,
      name: 'Murilo Souza',
      courseName: 'Communication Trainer',
      imagePath: 'assets/home/instructop4.jpg',
    },
    {
      id: 1,
      name: 'Murilo Souza',
      courseName: 'Data Science',
      imagePath: 'assets/home/instructor5.jpeg',
    },
    {
      id: 2,
      name: 'Murilo Souza',
      courseName: 'Photography',
      imagePath: 'assets/home/instructor6.jpg',
    },
    // Add more courses as needed
  ];
}
