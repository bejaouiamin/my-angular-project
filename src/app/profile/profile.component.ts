import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { UsercontrollerService } from '../services/services/usercontroller.service';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  adress!: string;
  userId!: number;

  constructor(
    private ngZone: NgZone, 
    private userservice: UsercontrollerService,
    private route: ActivatedRoute,
    private http: HttpClient  // Inject HttpClient to make HTTP requests
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID from route:', idParam);
    
    this.userId = Number(idParam);

    if (isNaN(this.userId)) {
      console.error('User ID is not set or invalid');
      
    }
  
    this.initMap();
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
      },
      error => {
        console.error('Error updating address', error);
      }
    );
  }
}
