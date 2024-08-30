import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { UsercontrollerService } from '../services/services/usercontroller.service';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from '../services/models/user';
import { AuthControllerService, SearchControllerService } from '../services/services';
import { Subject } from '../services/models';
import { AddSubject$Params } from '../services/fn/search-controller/add-subject';

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

  constructor(
    private ngZone: NgZone,
    private userservice: UsercontrollerService,
    private searchService: SearchControllerService,
    private authService: AuthControllerService,
    private route: ActivatedRoute,
    private http: HttpClient  // Inject HttpClient to make HTTP requests
  ) { }

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

    this.initMap();
    this.loadUserPicture();

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
  
}
