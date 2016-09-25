import { TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { WeatherComponent } from './weather';
import { WeatherService } from '../services/weather.service';

describe('WeatherComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ WeatherComponent],
      providers: [{provide: WeatherService, useValue: {} }]
    })
  });

  it('should display the weather ', () => {
    let fixture = TestBed.createComponent(WeatherComponent);
    let element = fixture.nativeElement;
    let component = fixture.componentInstance;
    component.weather = {place: 'New York', country: 'USA', humidity: 44, temperature: 57, pressure: 123, temp_min: 32, temp_max: 60, precip: 'cloudy', wind: 123, clouds:0 }; //,  wdata: null};

    fixture.detectChanges();

    expect(element.querySelector('h3').innerHTML).toBe('Current weather in New York:');
    expect(element.querySelector('li:nth-of-type(1)').innerHTML).toBe('Temperature: 57F');
    expect(element.querySelector('li:nth-of-type(2)').innerHTML).toBe('Humidity: 44%');
  });

});
