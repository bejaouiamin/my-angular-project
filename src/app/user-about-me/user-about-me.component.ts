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
  tuteurId!:number;

  constructor( 
    private userservice: UsercontrollerService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private tuteurservice: TuteurcontrollerService
  ){}


  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID from route:', idParam);
  
    // Convert route param to userId
    this.userId = Number(idParam);
  
    if (isNaN(this.userId)) {
      console.error('User ID is not set or invalid');
      return;
    }
  
    // Fetch user details using userId
    this.userservice.getUserById({ id: this.userId }).subscribe(
      (userData: User) => {
        this.user = userData;
        console.log('Full user object:', this.user);
    
        // Check if the user object contains tuteur information
        if (this.user.tuteur && this.user.tuteur.id) {
          this.tuteur = this.user.tuteur;
          this.tuteurId = this.user.tuteur.id;
          console.log('Tuteur details loaded:', this.tuteur);
        } else {
          
          this.loadTuteur();
        }
      },
      error => {
        console.error('Error loading user details:', error);
      }
    );
    
  }
  loadTuteur(): void {
    this.tuteurservice.getTuteurById({ id: this.userId }).subscribe({
      next: (tuteur: Tuteur) => {
        if (tuteur && tuteur.id !== undefined) {
          this.tuteur = tuteur;
          this.tuteurId = tuteur.id;
          console.log('Tuteur fetched by userId:', this.tuteurId);
        } else {
          console.error('Tuteur not found or ID is undefined');
        }
      },
      error: (error) => {
        console.error('Error fetching Tuteur by userId:', error);
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
