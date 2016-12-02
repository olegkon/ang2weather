import {Inject, Injectable, OpaqueToken} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {weatherRow} from '../components/weatherRow';

export const WEATHER_URL_BASE = new OpaqueToken('WeatherUrlBase');
export const WEATHER_URL_SUFFIX = new OpaqueToken('WeatherUrlSuffix');

export interface WeatherResult {
  place: string;  
  country: string;
  
  temperature: number; //string;
  humidity: number; //string;
  pressure: number; //string;
  min_temp: number; //string;
  max_temp:  number; //string;
  wind:  number; //string;
  precip:  string;
  clouds: number;
  
  temperature1: number;
  humidity1: number;
  pressure1: number;
  min_temp1: number;
  max_temp1: number;
  wind1:   number;
  clouds1: number;
  precip1: string;
  
  wdata: Array<weatherRow>;
}


@Injectable()
export class WeatherService {
  constructor(
      private http: Http,
      @Inject(WEATHER_URL_BASE) private urlBase: string,
      @Inject(WEATHER_URL_SUFFIX) private urlSuffix: string) {
  }

  getWeather(city: string): Observable<WeatherResult> {
    return this.http
        .get(this.urlBase + city + this.urlSuffix)
        .map((response: Response) => response.json())
        .filter(this._hasResult)
        .map(this._parseData);
  }

  private _hasResult(data): boolean {
    return data['cod'] !== '404' && data.list[0]; //main;main;
  }


  private _parseData(data): WeatherResult {
     
         var wdata1: weatherRow[] = new Array<weatherRow>();
     
/*       wdata1[0] = new weatherRow("Today", data.list[0].main.temp, data.list[0].main.humidity, data.list[0].main.pressure, data.list[0].main.temp_min,
             data.list[0].main.temp_max, data.list[0].wind.speed, data.list[0].clouds.all,  data.list[0].weather[0].main);     
         wdata1[1] = new weatherRow("Tomorrow", data.list[1].main.temp, data.list[1].main.humidity, data.list[1].main.pressure, data.list[1].main.temp_min,
             data.list[1].main.temp_max, data.list[1].wind.speed, data.list[1].clouds.all,  data.list[1].weather[0].main);     
         wdata1[2] = new weatherRow("Day after tomorrow", data.list[2].main.temp, data.list[2].main.humidity, data.list[2].main.pressure, data.list[2].main.temp_min,
             data.list[2].main.temp_max, data.list[2].wind.speed, data.list[2].clouds.all,  data.list[2].weather[0].main);
*/ 
     	 var len:number = data.list.length;
     	 if (len > 30)
     	   len=30;	// OK: restrict it to 30, after that it often has NULLs
	 var row;
	 for (var i = 0; len > i; i++) {
	     row = new weatherRow (i, data.list[i].main.temp, data.list[i].main.humidity, data.list[i].main.pressure, data.list[i].main.temp_min,
                 data.list[i].main.temp_max, data.list[i].wind.speed, data.list[i].clouds.all, data.list[i].weather[0].description);
		      
             wdata1.push(row);
	 }
     
         return {
           place: data.city.name || 'unknown',
           country: data.city.country,
           
           temperature: data.list[0].main.temp,
           humidity: data.list[0].main.humidity,
           pressure: data.list[0].main.pressure,
           min_temp: data.list[0].main.temp_min,
           max_temp: data.list[0].main.temp_max,
           wind: data.list[0].wind.speed,
           precip: data.list[0].weather[0].description,
           clouds: data.list[0].clouds.all
     
           , temperature1: data.list[1].main.temp,
           humidity1: data.list[1].main.humidity,
           pressure1: data.list[1].main.pressure,
           min_temp1: data.list[1].main.temp_min,
           max_temp1: data.list[1].main.temp_max,
           wind1: data.list[1].wind.speed,
           precip1: data.list[1].weather[0].description,
           clouds1: data.list[1].clouds.all           
     
          , wdata: wdata1
    };
  }

}