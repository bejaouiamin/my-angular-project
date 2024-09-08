import { Component, OnInit } from '@angular/core';
import { User } from '../services/models/user';
import { Router } from '@angular/router';
import { UsercontrollerService } from '../services/services/usercontroller.service';
import { SearchControllerService } from '../services/services';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styles: [
  ]
})
export class TeachersComponent implements OnInit {

  users: User[] = [];
  search = {
    subject: '',
    adress: ''
  };

  constructor(
    private router: Router,
    private userService: UsercontrollerService,
    private searchService: SearchControllerService,

  ) { }

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

  onSubmit(): void {
    this.searchService.searchTutors({
      subject: this.search.subject,
      adress: this.search.adress
    }).subscribe({
      next: (data: User[]) => {
        if (data.length === 0) {
          alert("No tutors found for the specified criteria.");
        } else {
          console.log(data);
          this.users = data;
        }
      },
      error: (error) => {
        if (error.status === 404) {
          alert("No tutors found with the specified criteria.");
        } else {
          console.error('Error fetching tutors:', error);
        }
      }
    });
  }




}
