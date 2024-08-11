import { Component, OnInit } from '@angular/core';
import { User } from '../services/models/user';
import { Router } from '@angular/router';
import { UsercontrollerService } from '../services/services/usercontroller.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styles: [
  ]
})
export class TeachersComponent implements OnInit {

  users: User[] = [];
  constructor(private router: Router,private userService: UsercontrollerService) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.userService.getUsersByRoleTuteur().subscribe({
      next: (data: User[]) => {
        console.log('Fetched users:', data); // Log the fetched data
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error); // Log any error
      }
    });
  }

  getPictureUrl(base64String?: string): string {
    if (base64String) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    return './assets/images/Profile_avatar.png'; // Fallback image
  }



}
