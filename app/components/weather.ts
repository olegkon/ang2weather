import {Component} from '@angular/core';
import {Control} from '@angular/common';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import {WeatherService, WeatherResult} from '../services/weather.service';

@Component({
  selector: 'my-weather',
  template: `
    <br/>
    <h2>Weather</h2>
    <input type="text" placeholder="Enter city" [ngFormControl]="searchInput"/>
    
      <h3>Current weather in {{weather?.place}} {{weather?.country}}:</h3>
        <ul>
          <li>Temperature: {{weather?.temperature}} F</li>
          <li>Humidity: {{weather?.humidity}} %</li>
          <li>Pressure: {{weather?.pressure}} mbar</li>
          <li>Wind:     {{weather?.wind}} mph</li>
          <li>Precipitation: {{weather?.precip}}</li>
          <li>Clouds: {{weather?.clouds}} %</li>
          <li>Min temp: {{weather?.temp_min}} F</li>
          <li>Max temp: {{weather?.temp_max}} F</li>
        </ul>
        
        <br/>
      
      <h3>Tomorrow:</h3>
        <ul>
          <li>Temperature: {{weather?.temperature1}} F</li>
          <li>Humidity: {{weather?.humidity1}} %</li>
          <li>Pressure: {{weather?.pressure1}} mbar</li>
          <li>Wind:     {{weather?.wind1}} mph</li>
          <li>Precipitation: {{weather?.precip1}}</li>
          <li>Clouds: {{weather?.clouds1}} %</li>
          <li>Min temp: {{weather?.temp_min1}} F</li>
          <li>Max temp: {{weather?.temp_max1}} F</li>
    </ul>
  `,
})

export class WeatherComponent {
  searchInput: Control;
  weather: WeatherResult;

  constructor(weatherService: WeatherService) {
    this.searchInput = new Control('');
    this.searchInput.valueChanges
        .debounceTime(300)
        .switchMap((place: string) => weatherService.getWeather(place))
        .subscribe(
            (weather: WeatherResult) => this.weather = weather,
            error => console.error(error),
            () => console.log('Weather is retrieved'));
  }
}
