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
        <br>     
        
      	<h3>Current weather in {{weather?.place}} {{weather?.country}}:</h3>    	       	    	
    	<ul>
    	    <li>Temperature: {{weather?.wdata[0].temperature}}F</li>           
            <li>Humidity: {{weather?.wdata[0].humidity}}%</li>
        </ul>   	
    	<!--br/ -->
    	 <h3>Tomorrow: </h3>
        <ul>
            <li>Temperature: {{weather?.wdata[1].temperature}}F</li>
            <li>Humidity: {{weather?.wdata[1].humidity}}%</li>
        </ul>         
        <h3>Day after tomorrow: </h3>
        <ul>
            <li>Temperature: {{weather?.wdata[2].temperature}}F</li>
            <li>Humidity: {{weather?.wdata[2].humidity}}%</li>
        </ul>       
        <br/>
        
         <ag-grid-ng2 style="height:300px; width:870px"  
            class="ag-fresh" [gridOptions]="gridOptions" >
         </ag-grid-ng2 >
     `
})


export class Grid2Component {

    private gridOptions:GridOptions;

    searchInput1: FormControl;

    weather: WeatherResult =  {
        place:"", country:"",
        temperature: 0, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, min_temp: 0, max_temp: 0,
        temperature1: 0, humidity1: 0, pressure1: 0, wind1: 0, precip1: "", clouds1: 0, min_temp1: 0, max_temp1: 0,
        wdata: [
            { day: "today", temperature: 0, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, temp_min: 0, temp_max: 0 },
            { day: "tomorrow", temperature: 1, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, temp_min: 0, temp_max: 0 },
            { day: "after tomorrow", temperature: 2, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, temp_min: 0, temp_max: 0 }
        ]
    };
    

    constructor(weatherService: WeatherService) {
        this.searchInput1 = new FormControl('');
        this.searchInput1.valueChanges
            .debounceTime(500)
            .switchMap((place: string) => weatherService.getWeather(place))
            .subscribe(
                (weather: WeatherResult) => {
                    this.weather = weather;
                    this.gridOptions.api.setRowData(this.createDGRowData(weather));	// pass grid data and refresh display
                    //this.gridOptions.rowData = this.createDGRowData(weather);	// that did not update grid display                    
                    //this.gridOptions.api.refreshView();	// refresh grid display
                    //console.log(this.gridOptions.rowData);	// debug
                },
                error => console.error(error),
                () => console.log('Weather is retrieved'));

        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = this.createColumnDefs();
        this.gridOptions.rowData = this.createDGRowData(this.weather); //this.
    }


    private createColumnDefs() {    
        return [
            { headerName: 'Day', field: "day", width:85},  //was 135
            { headerName: 'Temperature (F)', field: "temperature", width:125},
            { headerName: 'Humidity (%)', field: "humidity", width:90},
            { headerName: 'Pressure (mbar)', field: "pressure", width:115},
            { headerName: 'Wind (mph)', field: "wind", width:90},
            { headerName: 'Precip (%)', field: "precipitation", width:80},
            { headerName: 'Description', field: "clouds", width:80},
            { headerName: 'Min temp (F)', field: "temp_min", width:95},
            { headerName: 'Max temp (F)', field: "temp_max", width:95}
        ];
    }


    private createDGRowData(weather: WeatherResult) {
    	var arr:Array<weatherRow> = new Array();
    	var len:number = weather.wdata.length;
    	var row;
    	for (var i = 0; len > i; i++) {
    	    row = { 
    	      day: i, 
    	      temperature: weather.wdata[i].temperature,
    	      humidity: weather.wdata[i].humidity,
    	      pressure: weather.wdata[i].pressure, 
    	      wind: weather.wdata[i].wind, 
    	      precipitation: weather.wdata[i].precip,
	      clouds: weather.wdata[i].clouds, 
	      temp_min: weather.wdata[i].temp_min, 
	      temp_max: weather.wdata[i].temp_max 
	    };
	      
	    arr.push(row);
	}
	return arr;
	
/*	return [
		{ day: "today", temperature: weather.wdata[0].temperature,
		    humidity: weather.wdata[0].humidity, pressure: weather.wdata[0].pressure, wind: weather.wdata[0].wind, precipitation: weather.wdata[0].precip,
		    clouds: weather.wdata[0].clouds, temp_min: weather.wdata[0].temp_min, temp_max: weather.wdata[0].temp_max },
		{ day: "tomorrow", temperature: weather.wdata[1].temperature,
		    humidity: weather.wdata[1].humidity, pressure: weather.wdata[1].pressure, wind: weather.wdata[1].wind, precipitation: weather.wdata[1].precip,
		    clouds: weather.wdata[1].clouds, temp_min: weather.wdata[1].temp_min, temp_max: weather.wdata[1].temp_max },
		{ day: "day after tomorrow", temperature: this.weather.wdata[2].temperature,
		    humidity: weather.wdata[2].humidity, pressure: weather.wdata[2].pressure, wind: weather.wdata[2].wind, precipitation: weather.wdata[2].precip,
		    clouds: weather.wdata[2].clouds, temp_min: weather.wdata[2].temp_min, temp_max: weather.wdata[2].temp_max }

		//  {day: "09/30/2016", temperature: 33, humidity: 99, pressure: 1000, wind: 15, precipitation: "clouds", clouds: 22, temp_min: 62, temp_max: 77},
		//  {day: "09/31/2016", temperature: 54, humidity: 95, pressure: 1005, wind: 16, precipitation: "sunny", clouds: 20, temp_min: 58, temp_max: 72}
	    ];
*/	    
    }

}
