import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { UsercontrollerService } from '../services/services/usercontroller.service';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from '../services/models/user';
import { AuthControllerService, SearchControllerService, TuteurcontrollerService } from '../services/services';
import { Subject, Tuteur } from '../services/models';
import { AddSubject$Params } from '../services/fn/search-controller/add-subject';
import { StrictHttpResponse } from '../services/strict-http-response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  @ViewChild('addressForm', { static: true }) addressForm!: NgForm;

  public latitude!: number;
  public longitude!: number;
  public map!: L.Map;
  public marker!: L.Marker;

  users: User[] = [];
  userPictureUrl: string | null = null;
  adress!: string;
  userId!: number;
  selectedFile: File | null = null;
  user: User = {};  // Initialize user object
  subjects: Subject[] = [];
  newSubjectName: string = '';  // This will hold the value of the input field
  tuteur: Tuteur = {};
  tuteurId!: number;
  skillsInput: string = '';
  skillsPercentage: number = 0; 

  constructor(
    private ngZone: NgZone,
    private userservice: UsercontrollerService,
    private searchService: SearchControllerService,
    private authService: AuthControllerService,
    private route: ActivatedRoute,
    private http: HttpClient,  // Inject HttpClient to make HTTP requests
    private tuteurservice: TuteurcontrollerService
  ) { }

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


    this.initMap();
    this.loadUserPicture();

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


  onSubmit() {
    console.log('User object before submission:', this.user);

    if (this.user && this.user.id !== undefined) {
      // Handle user update
      const updateParams = { id: this.user.id, body: this.user };
      this.userservice.updateUtilisateur(updateParams).subscribe(
        response => {
          console.log('User details updated successfully', response);
          Swal.fire({
            title: "Success!",
            text: "Profile updated successfully!",
            icon: "success"
          }).then(() => {
            // This will be executed after the alert is closed
            location.reload();
          });
        },
        error => {
          console.error('Error updating user', error);
          Swal.fire({
            title: "Error!",
            text: "There was an error updating your profile.",
            icon: "error"
          });
        }
      );
    } else {
      console.error('User ID is missing, cannot update');
      Swal.fire({
        title: "Error!",
        text: "User ID is missing, cannot update.",
        icon: "error"
      });
    }
  }


  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const icon = L.icon({
      iconUrl: 'node_modules/leaflet/dist/images/marker-icon.png',
      shadowUrl: 'node_modules/leaflet/dist/images/marker-shadow.png'
    });

    this.marker = L.marker([51.505, -0.09], { icon: icon }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;

      this.marker.setLatLng(e.latlng);

      // Call reverse geocoding API
      this.reverseGeocode(this.latitude, this.longitude);
    });
  }

  reverseGeocode(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    this.http.get(url).subscribe((response: any) => {
      console.log('Reverse Geocode response:', response);
      if (response && response.display_name) {
        this.adress = response.display_name;
      } else {
        this.adress = `Lat: ${lat}, Lng: ${lng}`;
      }
    }, error => {
      console.error('Error fetching location name', error);
      this.adress = `Lat: ${lat}, Lng: ${lng}`;  // Fallback in case of an error
    });
  }

  saveAddress() {
    if (isNaN(this.userId)) {
      console.error('User ID is not set');
      return;
    }

    this.userservice.updateUserAddress({
      userId: this.userId,
      body: this.adress
    }).subscribe(
      response => {
        console.log('Address updated successfully', response);
        // Display success alert
        Swal.fire({
          title: "Local Address!",
          text: "Address updated successfully!",
          icon: "success"
        });
      },
      error => {
        console.error('Error updating address', error);
      }
    );
  }


  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      // Display the selected image immediately
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPictureUrl = e.target.result;
      };
      if (this.selectedFile) {  // Ensure selectedFile is not null
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  uploadPicture(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    // Create a Blob object from the selected file
    const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });

    // Call the service method with the correct parameters
    this.userservice.uploadUserPicture({
      userId: this.userId,
      body: { file: blob }
    }).subscribe(
      response => {
        console.log('Picture uploaded successfully', response);
        this.loadUserPicture();  // Refresh the picture

        // Display success alert
        Swal.fire({
          title: "Good job!",
          text: "Picture uploaded successfully!",
          icon: "success"
        });
      },
      error => {
        console.error('Error uploading picture', error);
      }
    );
  }


  // Load the user's picture
  loadUserPicture(): void {
    this.userservice.getUserById({ id: this.userId }).subscribe(user => {
      if (user && user.picture) {
        // Assuming the picture is returned as a base64 encoded string
        this.userPictureUrl = 'data:image/jpeg;base64,' + user.picture;

      } else {
        this.userPictureUrl = 'https://bootdey.com/img/Content/avatar/avatar1.png'; // Default avatar
      }
    }, error => {
      console.error('Error loading picture', error);
    });
  }

  newSubject(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (!user.id) {
        Swal.fire({
          title: 'Error!',
          text: 'User ID is not available.',
          icon: 'error'
        });
        return;
      }

      const newSubject: Subject = {
        name: this.newSubjectName,
        createdDate: new Date().toISOString(),
      };

      const params: AddSubject$Params = {
        body: newSubject,
        userId: user.id,
      };

      this.searchService.addSubject(params).subscribe({
        next: (response) => {
          console.log('Received response:', response);
          Swal.fire({
            title: 'Success!',
            text: 'New subject added successfully!',
            icon: 'success'
          });
        },
        error: (err) => {
          console.error('Error occurred:', err);
          if (err.message === 'Subject already added.') {
            Swal.fire({
              title: 'Error!',
              text: 'This subject has already been added.',
              icon: 'error'
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'There was an error adding the new subject.',
              icon: 'error'
            });
          }
        }
      });
    });
  }

  saveEducation(): void {
    // Set the user object inside the Tuteur
    this.tuteur.user = this.user;  // Ensure the user property is set
    // Call the updateTuteur function to send the request to the backend
    this.tuteurservice.createTuteur({ body: this.tuteur }).subscribe({
      next: (response) => {
        console.log('Tuteur created with Education level details:', response);
        Swal.fire({
          title: 'Success!',
          text: 'The information was saved successfully!',
          icon: 'success'
        });
      },
      error: (error) => {
        console.error('Error updating Tuteur:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error saving the information.',
          icon: 'error'
        });
      }
    });
  }

  saveExperience(): void {
    // Convert period from string (if entered as "10 ans") to an integer
    if (typeof this.tuteur.period === 'string') {
      const extractedNumber = parseInt(this.tuteur.period.replace(/\D/g, ''), 10); // Remove any non-numeric characters
      this.tuteur.period = extractedNumber;
    }
    // Ensure the Tuteur object has the correct User with an ID
    if (!this.user || !this.user.id) {
      console.error('User is not set or User ID is missing.');
      Swal.fire({
        title: 'Error!',
        text: 'User information is missing. Cannot update without a User ID.',
        icon: 'error'
      });
      return;
    }

    // Set the user object inside the Tuteur
    this.tuteur.user = this.user;  // Ensure the user property is set

    // Ensure the ID is set
    if (!this.tuteur.id) {
      console.error('Tuteur ID is not set. Cannot update without an ID.');
      Swal.fire({
        title: 'Error!',
        text: 'Tuteur ID is missing. Cannot update without an ID.',
        icon: 'error'
      });
      return;
    }

    // Call the updateTuteur function to send the request to the backend
    this.tuteurservice.updateTuteur({ body: this.tuteur }).subscribe({
      next: (response) => {
        console.log('Tuteur updated with experience details:', response);
        Swal.fire({
          title: 'Success!',
          text: 'The information was saved successfully!',
          icon: 'success'
        });
      },
      error: (error) => {
        console.error('Error updating Tuteur:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error saving the information.',
          icon: 'error'
        });
      }
    });
  }
  addSkills(): void {
    if (this.skillsInput.trim() && this.skillsPercentage > 0 && this.skillsPercentage <= 100) {
      const newSkills = this.skillsInput.split(',').map(skill => ({
        name: skill.trim(),
        percentage: this.skillsPercentage // Set percentage for each skill
      }));
      this.tuteur.skills = [...(this.tuteur.skills || []), ...newSkills];
      
    }
  }


}
