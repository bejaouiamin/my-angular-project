import { Component, OnInit } from '@angular/core';
import { UsercontrollerService } from '../services/services/usercontroller.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../services/models/user';
import { Tuteur } from '../services/models/tuteur';
import { TuteurcontrollerService } from '../services/services/tuteurcontroller.service';

@Component({
  selector: 'app-user-about-me',
  templateUrl: './user-about-me.component.html',
  styleUrls: ['./user-about-me.component.css']
})
export class UserAboutMeComponent implements OnInit {

  user: User = {};  
  tuteur: Tuteur = {};
  userId!: number;

  constructor( 
    private userservice: UsercontrollerService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private tuteurservice: TuteurcontrollerService
  ){}


  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID from route:', idParam);

    this.userId = Number(idParam);

    if (isNaN(this.userId)) {
      console.error('User ID is not set or invalid');

    }
    // Load user details by ID
    this.userservice.getUserById({ id: this.userId }).subscribe(
      (userData: User) => {
        this.user = userData;
        console.log('User details loaded:', this.user);
        console.log('User ID:', this.user.id);
      },
      error => {
        console.error('Error loading user details', error);
      }
    );
  }

  getPictureUrl(base64String?: string): string {
    if (base64String) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    return './assets/images/Profile_avatar.png'; // Fallback image
  }

}
