import { TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
    //component.weather = {place: 'New York', humidity: 44, temperature: 57};
     component.weather = {place: 'New York', country: 'US',
          humidity: 44, temperature: 57, pressure: 123, min_temp: 32, max_temp: 60, precip: 'cloudy', wind: 123, clouds:0,
          humidity1: 44, temperature1: 57, pressure1: 123, min_temp1: 32, max_temp1: 60, precip1: 'cloudy', wind1: 123, clouds1:0
    }; //,  wdata: null};
    
    fixture.detectChanges();

    expect(element.querySelector('h3').innerHTML).toBe('Current weather in New York US:');
    expect(element.querySelector('li:nth-of-type(1)').innerHTML).toBe('Temperature: 57 F');
    expect(element.querySelector('li:nth-of-type(2)').innerHTML).toBe('Humidity: 44 %');
  });
});
