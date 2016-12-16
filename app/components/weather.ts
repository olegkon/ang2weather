import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import {WeatherService, WeatherResult} from '../services/weather.service'
;

@Component({
  selector: 'my-weather',
  template: `
        <h2>Weather Component</h2>
        <input type="text" placeholder="Enter city" [formControl]="searchInput">    
          <h3>Current weather in {{weather?.place}} {{weather?.country}}:</h3>
            <ul>
              <li>Temperature: {{weather?.temperature}} F</li>
              <li>Humidity: {{weather?.humidity}} %</li>
              <li>Pressure: {{weather?.pressure}} mbar</li>
              <li>Wind:     {{weather?.wind}} mph</li>
              <li>Precipitation: {{weather?.precip}}</li>
              <li>Clouds: {{weather?.clouds}} %</li>
              <li>Min temp: {{weather?.min_temp}} F</li>
              <li>Max temp: {{weather?.max_temp}} F</li>
            </ul>        
            <br/>
        <h3>Tomorrow: </h3>
          <ul>
            <li>Temperature: {{weather?.temperature1}}F</li>
            <li>Humidity: {{weather?.humidity1}}%</li>    
            <li>Pressure: {{weather?.pressure1}} mbar</li>
            <li>Wind:     {{weather?.wind1}} mph</li>      
            <li>Clouds: {{weather?.clouds1}} %</li>
            <li>Min temp: {{weather?.min_temp1}} F</li>
            <li>Max temp: {{weather?.max_temp1}} F</li>
            <li>Preciptitation: {{weather?.precip1}} </li>
      </ul>
  `,
})

export class WeatherComponent {
  searchInput: FormControl;
  weather: WeatherResult;

  constructor(weatherService: WeatherService) {
    this.searchInput = new FormControl('');
    this.searchInput.valueChanges
        .debounceTime(300)
        .switchMap((place: string) => weatherService.getWeather(place))
        .subscribe(
            (weather: WeatherResult) => this.weather = weather,
            error => console.error(error),
            () => console.log('Weather is retrieved'));
  }
}
