import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

import {AgGridNg2} from 'ag-grid-ng2/main';

import {GridOptions} from 'ag-grid/main';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
 
import {WeatherService, WeatherResult} from '../services/weather.service';
import {weatherRow} from "./weatherRow";



@Component({
    selector: 'my-grid2',
    template: `
    	<br/>
    	<h2>Grid2 Component</h2> 
    	
    	<input type="text" placeholder="Enter city" [formControl]="searchInput1"/>
		    
      	<h3>Current weather in {{weather?.place}} {{weather?.country}}:</h3>     	
    	<!-- br/ -->        	    	
    	<ul>
            <li>Temperature: {{weather?.temperature}}F</li>
            <li>Humidity: {{weather?.humidity}}%</li>
        </ul>   	
    	<br/>
    	 <h3>Tomorrow: </h3>
        <ul>
            <li>Temperature: {{weather?.temperature1}}F</li>
            <li>Humidity: {{weather?.humidity1}}%</li>
        </ul>        
     `
})

//OK: from line 23:  {{weather?.country}}:
//OK: 25:  <h3>Temperature today: {{myData?.temperature}}</h3>
//OK: 30: <ag-grid-ng2 #agGrid style="height:100%; width:845px" class="ag-fresh" [gridOptions]="gridOptions">
//OK: 31    </ag-grid-ng2 >

export class Grid2Component {

 //myRowData = []; // this.myData ; //[ this.myData ];  //];  this.weather.wdata;

 /*
 { temperature: this.myData.temperature,
   humidity: this.myData.humidity,
   pressure: this.myData.pressure,
   wind: this.myData.wind,
   precipitation: this.myData.precip,
   clouds: this.myData.clouds,
   min_temp: this.myData.temp_min,
   max_temp: this.myData.temp_max
  }
 ];

{ temperature: {{weather?.temperature}},
    humidity: {{weather?.humidity}},
    pressure: {{weather?.pressure}},
    wind: {{weather?.wind}},
    precipitation: {{weather?.precip}},
    clouds: {{weather?.clouds}},
    min_temp: {{weather?.temp_min}},
    max_temp: {{weather?.temp_max}}
} ];
*/

    //private gridOptions:GridOptions;
    
    searchInput1: FormControl;
    weather: WeatherResult;

    //myData:weatherRow; // = weather.wdata[0];

    
    constructor(weatherService: WeatherService) {

        this.searchInput1 = new FormControl('');
        this.searchInput1.valueChanges
            .debounceTime(300)
            .switchMap((place: string) => weatherService.getWeather(place))
            .subscribe(
                (weather: WeatherResult) => this.weather = weather,
                error => console.error(error),
                () => console.log('Weather is retrieved'));

        //this.gridOptions = <GridOptions>{};
        //this.gridOptions.rowData = this.myRowData; //this.createRowData();
        //this.gridOptions.columnDefs = this.createColumnDefs();

/*        this.gridOptions = {	// for a grid
            rowData: this.myRowData,
            columnDefs: this.columnDefs,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true
        }
*/
  }

    private createColumnDefs() {
        return [
            { headerName: 'Day', field: "day", width:65},
            { headerName: 'Temperature', field: "temperature", width:125},
            { headerName: 'Humidity', field: "humidity", width:80},
            { headerName: 'Pressure', field: "pressure", width:100},
            { headerName: 'Wind', field: "wind", width:80},
            { headerName: 'Precipitation', field: "precipitation", width:125},
            { headerName: 'Clouds', field: "clouds", width:100},
            { headerName: 'Min Temp', field: "min_temp", width:80},
            { headerName: 'Max Temp', field: "max_temp", width:80}
        ];
    }

}


