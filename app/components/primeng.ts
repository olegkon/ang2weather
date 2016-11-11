import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

//import {ComponentModule} from 'primeng/components/componentname/componentname';
//import {InterfaceName} from 'primeng/components/common/api';
//import {DataTableModule} from 'primeng/components/datatable;


import {DataTableModule, SharedModule} from 'primeng/primeng';

import {WeatherService, WeatherResult} from '../services/weather.service';
import {weatherRow} from "./weatherRow";



@Component({
    selector: 'my-primeng',
    template: `
    	<br/>
    	<h2>PrimeNG Component</h2> 
    	
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
        
         <!--ag-grid-ng2 style="height:300px; width:870px"  
            class="ag-fresh" [gridOptions]="gridOptions" >
         </ag-grid-ng2 -->

         
         <p-dataTable [value]="arr">
            <p-column *ngFor="let col of cols" [field]="col.field" [header]="col.header"></p-column>
         </p-dataTable>
     `
})


export class PrimeNGComponent implements OnInit {
    //private gridOptions:GridOptions;

    //cars: Car[];
    arr: weatherRow[]; //Array<weatherRow>;
    cols: any[];

    searchInput1: FormControl;

    weather: WeatherResult;
    /*= {
        place:"", country:"",
        temperature: 0, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, min_temp: 0, max_temp: 0,
        temperature1: 0, humidity1: 0, pressure1: 0, wind1: 0, precip1: "", clouds1: 0, min_temp1: 0, max_temp1: 0,
        wdata: [
            { day: "today", temperature: 0, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, temp_min: 0, temp_max: 0 },
            { day: "tomorrow", temperature: 1, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, temp_min: 0, temp_max: 0 },
            { day: "after tomorrow", temperature: 2, humidity: 0, pressure: 0, wind: 0, precip: "", clouds: 0, temp_min: 0, temp_max: 0 }
        ]
    };
  */

    constructor(weatherService: WeatherService) {
        this.searchInput1 = new FormControl('');
        this.searchInput1.valueChanges
            .debounceTime(500)
            .switchMap((place: string) => weatherService.getWeather(place))
            .subscribe(
                (weather: WeatherResult) => {
                    this.weather = weather;
                    this.arr = this.createDGRowData(weather);
                    //this.gridOptions.api.setRowData(this.createDGRowData(weather));	// pass grid data and refresh display
                    //this.gridOptions.rowData = this.createDGRowData(weather);	// that did not update grid display
                    //this.gridOptions.api.refreshView();	// refresh grid display
                    //console.log(this.gridOptions.rowData);	// debug
                },
                error => console.error(error),
                () => console.log('Weather is retrieved'));

//        this.gridOptions = <GridOptions>{};
//        this.gridOptions.columnDefs = this.createColumnDefs();
//        this.gridOptions.rowData = ['undefined']; //this.createDGRowData(this.weather); //this.
    }


    private createColumnDefs() {    
        return [
            { field: "day", header: 'Day' },                    //width:85},
            { field: "temperature", header: 'Temp (F)' },       //width:85},
            { field: "humidity", header: 'Humidity (%)' },      // width:90},
            { field: "pressure", header: 'Pressure (mbar)' },   //width:115},
            { field: "wind", header: 'Wind (mph)' },            //width:90},
            { field: "precipitation", header: 'Precip (%)' },   // width:80},
            { field: "clouds", header: 'Description' },         //width:120},
            { field: "temp_min", header: 'Min temp (F)' },      //width:95},
            { field: "temp_max", header: 'Max temp (F)' }       //, width:95}
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
    }


    ngOnInit() {
        //this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = this.createColumnDefs();
/*        [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];
*/
    }

}
