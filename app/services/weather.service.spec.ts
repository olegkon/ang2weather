import {Injector} from '@angular/core';
import {async, getTestBed, TestBed,} from '@angular/core/testing';
import {Response, ResponseOptions, HttpModule, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {WeatherService, WEATHER_URL_BASE, WEATHER_URL_SUFFIX} from './weather.service';


describe('WeatherService', () => {
  let mockBackend: MockBackend;
  let service: WeatherService;
  let injector: Injector;
  

  beforeEach(() => {
    TestBed.configureTestingModule ({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        { provide: WEATHER_URL_BASE, useValue: '' },
        { provide: WEATHER_URL_SUFFIX, useValue: '' },
        WeatherService
      ]
    });

    injector = getTestBed();
  });


  beforeEach(() => {
    mockBackend = injector.get(XHRBackend);
    service = injector.get(WeatherService);
  });


  it('getWeather() should return weather for New York', async(() => {
    let mockResponseData = {
      cod: '200',
      city: {
              name: 'New York'              
      },
      list: 
      [ 
      	{        
		main: {
			  temp: 57,
			  temp_min: 55,
			  temp_max: 57,			  		  
			  pressure: 1023,
			  humidity: 44
		},
		weather: [ 
		  {			
			description: "Light Rain"
		  } ],
		clouds: {
			all: 0
		},
		wind: {
			speed: 10
		}
        } 
      ]  // of list 
    
  };   // of let


     //   place: data.city.name || 'unknown',
     //   temperature: data.list[0].main.temp,
     //   humidity: data.list[0].main.humidity,
     //   wind: data.list[0].wind.speed,

    mockBackend.connections.subscribe((connection: MockConnection) => {
      let responseOpts = new ResponseOptions({body: JSON.stringify(mockResponseData)});
      connection.mockRespond(new Response(responseOpts));
    });

    service.getWeather('New York').subscribe(weather => {
      expect(weather.place).toBe('New York');
      expect(weather.humidity).toBe(44);
      expect(weather.temperature).toBe(57);
    });
    
  }));  // it
  
}); // describe
