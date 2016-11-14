import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

//import {ComponentModule} from 'primeng/components/componentname/componentname';
//import {InterfaceName} from 'primeng/components/common/api';
//import {DataTableModule} from 'primeng/components/datatable;


import {DataTableModule, DataGridModule, ChartModule, SharedModule} from 'primeng/primeng';
import {DataTable, DataGrid, Column, ChartModule
        } from 'primeng/primeng';

import {WeatherService, WeatherResult} from '../services/weather.service';
import {weatherRow} from "./weatherRow";



@Component({
    selector: 'my-primeng',
    template: `
    	<br/>
    	<h2>PrimeNG Components</h2> 
    	
    	<input type="text" placeholder="Enter city" [formControl]="searchInput1"/>
        <br>     
        
      	<h3>Current weather in {{weather?.place}} {{weather?.country}}:</h3>    	       	    	
    	<ul>
    	    <li>Temperature: {{weather?.wdata[0].temperature}}F</li>           
            <li>Humidity: {{weather?.wdata[0].humidity}}%</li>
        </ul>   	    	
    	 <h3>Tomorrow: </h3>
        <ul>
            <li>Temperature: {{weather?.wdata[1].temperature}}F</li>
            <li>Humidity: {{weather?.wdata[1].humidity}}%</li>
        </ul>         
		<!-- h3>Day after tomorrow: </h3>
		<ul>
		    <li>Temperature: {{weather?.wdata[2].temperature}}F</li>
		    <li>Humidity: {{weather?.wdata[2].humidity}}%</li>
		</ul -->       
        <!-- br/ -->
         
         <h3>DataTable:</h3> 
         <p-dataTable [value]="arr">
            <p-column *ngFor="let col of cols" [field]="col.field" [header]="col.header"></p-column>
         </p-dataTable >
         
         <br/><br/>
         
         <p-dataGrid [value]="arr" [paginator]="true" [rows]="30">
	     <header>
	         DataGrid:
	     </header>  
	     
	     <!-- template let-car>	     
	         <div style="padding:3px" class="ui-g-12 ui-md-3">	         	
	             <p-panel [header]="col.header" [paginator]="true" [style]="{'text-align':'center'}">	                 
	                 <div class="car-detail">{{col.field}}</div>
	                 <hr class="ui-widget-content" style="border-top:0">
	                 <i class="fa fa-search" (click)="selectCar(car)" style="cursor:pointer"></i>
	             </p-panel>	             
	         </div>	         
	     </template -->
	     
	 </p-dataGrid>
         
         
         <br/>
	          
         <h3>LineChart:</h3>
         <!-- p-chart type="line" [data]="data"></p-chart -->
         
         <!-- p-growl [value]="msgs"></p-growl -->	 
	 <!-- p-chart type="line" [data]="data" (onDataSelect)="selectData($event)"></p-chart -->
         
     ` ,
     directives: [            
             DataTable, Column, DataGrid     
             //, TabPanel, TabView, Header, Footer, Dialog, Button, InputText
     ]
})


export class PrimeNGComponent implements OnInit {

    arr: weatherRow[]; //Array<weatherRow>;
    cols: any[];
    
    // for Line Chart
    data: any;          
    msgs: Message[];

    searchInput1: FormControl;

    weather: WeatherResult;


    selectData(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    }
  
  

    constructor(weatherService: WeatherService) {
        this.searchInput1 = new FormControl('');
        this.searchInput1.valueChanges
            .debounceTime(500)
            .switchMap((place: string) => weatherService.getWeather(place))
            .subscribe(
                (weather: WeatherResult) => {
                    this.weather = weather;
                    this.arr = this.createDGRowData(weather);
                    this.data = this.createChartData(weather);                    
                },
                error => console.error(error),
                () => console.log('Weather is retrieved'));
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
    
    
    private createChartData(weather: WeatherResult) {
       //var chartData:Any;
       var len:number = weather.wdata.length;          	
       var chartData = {
	   labels: [],
	   datasets: [
	      {
	         label: 'Min Temp',
	         data: [],
	         fill: false,
	         borderColor: '#4bc0c0'
	       },
	       {
	          label: 'Max Temp',
	          data: [],
	          fill: false,
	          borderColor: '#565656'
	        }
	   ]
       };
       for (var i = 0; len > i; i++) {
          chartData.labels.push(i);
          chartData.datasets[0].data.push(weather.wdata[i].temp_min);
          chartData.datasets[1].data.push(weather.wdata[i].temp_max);       	 	    
    	}
    	return chartData; 
    }
    

    ngOnInit() {
        this.cols = this.createColumnDefs();
    }

}
