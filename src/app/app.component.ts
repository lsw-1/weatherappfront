import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';

const WEATHER_URL = 'http://localhost:8080/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather App';
  temperature: String;
  location: String;
  searchTerm: String;
  addLocationTerm: String;
  addUnitType: String = 'celsius';
  locations: Location[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Location[]>(WEATHER_URL + 'cities').subscribe(data => {
      this.locations = data;
    });
    console.log(this.locations);
  }

  onKeySearch(event: any) {
    this.searchTerm = event.target.value;
  }

  onKeyAdd(event: any) {
    this.addLocationTerm = event.target.value;
  }

  searchCurrentWeather() {
    this.http.get<ApiSearchResponse>(WEATHER_URL + `cities/search/${this.searchTerm.toLowerCase()}`).subscribe(data => {
      this.temperature = data.main.temp;
      this.location = data.name;
    });
  }

  addNewLocation() {
    const newLocation = {location: this.addLocationTerm, unit: this.addUnitType};
    this.http.post(WEATHER_URL + 'cities', newLocation).subscribe(data =>
      this.locations.push(<Location>data)
    );
  }
}

interface ApiSearchResponse {
  main: {
    temp: String
  };
  name: String;
}

interface Location {
  location: String;
  unit: String;
}
