import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

interface CarouselItem {
  image: string;
  description: string;
  title: string; // Add the title property here
}
interface Category{
id:number;
icon:string;
name:string;

}
interface Course {
  id: number;
  name: string;
  amount: number;
  imagePath: string;
}
interface Instructor {
  id: number;
  name: string;
  courseName:string;
  imagePath: string;
}


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class UserHomeComponent implements OnInit,OnDestroy {
  currentIndex = 0;
  images: string[] = [ 'img2.avif', 'img4.avif','img3.avif']; // Add your image URLs here
  private alive = true;



  carouselItems: CarouselItem[] = [
    { image: 'img2.vif', description: 'Learn from the best Online Training', title: 'Enjoy smooth learning' },
    { image: 'img3.avif', description: 'More than 50+ Online Courses', title: 'Enjoy smooth Learning' },
    { image: 'img4.avif', description: 'Dream Future', title: 'Enjoy smooth Learning' },
    // Add more items as needed
  ];
   
  categories:Category[]=[
    {id:1, icon:'web',name: 'Web Development'},
    {id:2, icon:'data_usage',name: 'Data Science'},
    {id:3, icon:'language',name: 'Language'},
    {id:4, icon:'business',name: 'Business'},
    {id:5, icon:'science',name: 'Rocket Science'},
    {id:6, icon:'photo',name: 'Photography'},
    {id:7, icon:'engineering',name: 'DSA'},
    {id:8, icon:'psychology',name: 'Personal Development'},
  ]

  courses: Course[] = [
    { id: 1, name: 'Course Name 1', amount: 50, imagePath: 'course1.jpg' },
    { id: 2, name: 'Course Name 2', amount: 60, imagePath: 'course2.png' },
    { id: 1, name: 'Course Name 1', amount: 50, imagePath: 'course3.jfif' },
    { id: 2, name: 'Course Name 2', amount: 60, imagePath: 'course4.jpg' },
    { id: 1, name: 'Course Name 1', amount: 50, imagePath: 'course5.jfif' },
    { id: 2, name: 'Course Name 2', amount: 60, imagePath: 'course6.jfif' },
    // Add more courses as needed
  ];

  instructors: Instructor[] = [
    { id: 1, name: 'Murilo Souza', courseName:'Web Development', imagePath: 'instructor3.jpg' },
    { id: 2, name: 'Murilo Souza', courseName:'Business', imagePath: 'instructor2.jpg' },
    { id: 1, name: 'Murilo Souza', courseName:'Personal Development',  imagePath: 'instructor3.jpg' },
    { id: 2, name: 'Murilo Souza', courseName:'Communication Trainer', imagePath: 'instructop4.jpg' },
    { id: 1, name: 'Murilo Souza', courseName:'Data Science', imagePath: 'instructor5.jpeg' },
    { id: 2, name: 'Murilo Souza', courseName:'Photography', imagePath: 'instructor6.jpg' },
    // Add more courses as needed
  ];


  ngOnInit(): void {
    interval(3000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.nextSlide());
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }



  ngOnDestroy(): void {
    this.alive = false;
  }

}
