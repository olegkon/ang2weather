import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import {DataTable, DataGrid, Column, Chart, Panel} from 'primeng/primeng';  // TabPanel

import {WeatherService, WeatherResult} from '../services/weather.service';
import {weatherRow} from "./weatherRow";



@Component({
    selector: 'my-primeng',
    template: `
    	<br/>
    	<h2>PrimeNG Components</h2> 
    	
    	<input type="text" placeholder="Enter city" [formControl]="searchInput1"/>
        <br>     
        
      	<h4>Current weather in {{weather?.place}} {{weather?.country}}:</h4>    	       	    	
    	<ul>
    	    <li>Temperature: {{weather?.wdata[0].temperature}}F</li>           
            <li>Humidity: {{weather?.wdata[0].humidity}}%</li>
        </ul>   	    	
    	 <h4>Tomorrow: </h4>
        <ul>
            <li>Temperature: {{weather?.wdata[1].temperature}}F</li>
            <li>Humidity: {{weather?.wdata[1].humidity}}%</li>
        </ul>         
         
         <h3>DataTable:</h3> 
         <p-dataTable [value]="arr">
            <p-column  *ngFor="let col of cols"  [field]="col.field"  [header]="col.header"></p-column>
         </p-dataTable >                         
         <br/>
	          
         <h3>LineChart:</h3>
         <p-chart type="line" [data]="data" [options]="options"></p-chart>                 	 
	 <br/>
	 
	 <h3>BarChart:</h3>
         <p-chart type="bar" [data]="barChartData" ></p-chart>         
         <br/>
         
         <h3>PieChart:</h3>
         <p-chart type="pie" [data]="pieChartData"></p-chart>
	 <br/>
	 
	 
	 <p-dataGrid [value]="arr" [paginator]="true" [rows]="30">
		 <header>
	 	         DataGrid1:
	         </header>  	     
	         <template let-weatherRow>	     
	         	<div class="ui-g-12 ui-md-2">
	         		<hr ui-datagrid-content style="border:1">
				<p-panel *ngFor="let col of cols; let i=index" [header]="col.header" [style]="{'text-align':'center'}">				    
				    {{weatherRow[col.field]}}
				</p-panel>	
				
			</div>
			
	             <!-- div style="padding:3px" class="ui-g-12 ui-md-2" -->
	         	<!-- div class="ui-datagrid-content ui-widget-content">
		                <div class="ui-g">
	    	                    <template ngFor [ngForOf]="arr" [ngForTemplate]="itemTemplate"></template>
		                </div>
	       		</div -->
	 	         	<!-- div class="car-detail">{{arr[row].field}}</div -->
	 	         	
	 	             <!-- p-panel [header]="'Day '+weatherRow.day+': temp min - max'" [style]="{'text-align':'center'}">	                 
	 	                 <div class="car-detail">{{weatherRow.temp_min}} - {{weatherRow.temp_max}}</div>	 	                 
	 	             </p-panel -->	             
	 	     <!-- /div -->
	 	     
	 	 </template>	     
	 </p-dataGrid>  
         
     ` ,
     directives: [	// see source code: https://github.com/primefaces/primeng/blob/master/components/datagrid/datagrid.ts
			// forum: http://forum.primefaces.org/viewtopic.php?f=35&t=48092&p=148939&hilit=datagrid#p148939
             DataTable, Column, DataGrid, Chart, Panel         //, TabPanel, TabView, Header, Footer, Dialog, Button, InputText
     ]
})


export class PrimeNGComponent implements OnInit {

    searchInput1: FormControl;    
    weather: WeatherResult;
    
    // for DataTable / DataGrid
    arr: weatherRow[];  
    cols: any[];

    
    // for Line Chart
    options: any = {
            title: {
                display: true,
                text: 'Temperature Line Chart',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
    };    
    
    // for Line Chart
    data: any =  {
	   labels: [],
	   datasets: [
	      {  label: 'Min Temp',
	         data: [],
	         fill: false,
	         borderColor: '#4bc0c0'
	       },
	       {  label: 'Max Temp',
	          data: [],
	          fill: false,
	          borderColor: '#ff0000'  //'#565656'
	        }
	   ]
       };    
       
        // for Bar Chart
    	barChartData: any =  {
	   labels: [],
	   datasets: [
	      {  label: 'Min Temp',
	         backgroundColor: '#42A5F5',
                 borderColor: '#1E88E5',
	         data: []	         
	       },
	       {  label: 'Max Temp',
	          backgroundColor: '#9CCC65',
	          borderColor: '#ff0000'  //'#565656'
	          data: []	          
	        }
	   ]
       };           
       
       
       // for Pie Chart
       pieChartData: any =  {
       	   labels: [],
       	   datasets: [
       	      {
	        data: [],
	        backgroundColor: [
	        	"#FF6384",
	                "#36A2EB",
	                "#FFCE56",
	                "#FF6381",
			"#36A2E2",
	                "#FFCE53"
	        ],
	        hoverBackgroundColor: [
	        	"#FF6384",
	        	"#36A2EB",
	        	"#FFCE56",
	        	"#FF6381",
			"#36A2E2",
	                "#FFCE53"
	        ]
              }
       	   ]
       };       
       
  
//    selectCar(car: weatherRow) {
//            this.selectedCar = weatherRow;
//            this.displayDialog = true;
//    }


    constructor(weatherService: WeatherService) {
        this.searchInput1 = new FormControl('');
        this.searchInput1.valueChanges
            .debounceTime(500)
            .switchMap((place: string) => weatherService.getWeather(place))
            .subscribe(
                (weather: WeatherResult) => {
                    this.weather = weather;
                    this.arr = this.createDGRowData(weather);	// dataTable
                    this.data = this.createChartData(weather);  // lineChart
                    this.barChartData = this.createBarChartData(weather);  // barChart
                    this.pieChartData = this.createPieChartData(weather);  // pieChart
                },
                error => console.error(error),
                () => console.log('Weather is retrieved'));
    }
	
	
    ngOnInit() {	
        this.cols = this.createColumnDefs();
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
    	var arr:Array<weatherRow> = []; //new Array();
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
       var len:number = weather.wdata.length;          	
       var chartData:Any = {
	   labels: [],
	   datasets: [
	      {  label: 'Min Temp',
	         data: [],
	         fill: false,
	         borderColor: '#4bc0c0'
	       },
	       {  label: 'Max Temp',
	          data: [],
	          fill: false,
	          borderColor: '#ff0000'   //'#565656'
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
    
    
    private createBarChartData(weather: WeatherResult) {       
           var len:number = weather.wdata.length;          	
           var barChartData:Any = {
		   labels: [],
		   datasets: [
		      {	  label: 'Min Temp',
			  backgroundColor: '#4bc0c0', //'#42A5F5',
			  borderColor: '#4bc0c0',
			  data: []	         
		      },
		      {	   label: 'Max Temp',
			   backgroundColor: '#ff0000', //'#9CCC65',
			   borderColor: '#ff0000',  //'#565656'
			   data: []	          
		      }
		   ]
           };
           for (var i = 0; len > i; i++) {
              barChartData.labels.push(i);
              barChartData.datasets[0].data.push(weather.wdata[i].temp_min);
              barChartData.datasets[1].data.push(weather.wdata[i].temp_max);       	 	    
        }
        return barChartData; 
    }
    
    
    private createPieChartData(weather: WeatherResult) {       
        var len:number = weather.wdata.length;          	
        var pieChartData: Any =  {
       	   labels: [],
       	   datasets: [
       	      {
	        data: [],
	        backgroundColor: [
	        	"#FF6384",
	                "#36A2EB",
	                "#FFCE56",
	                "#FF6381",
			"#36A2E2",
	                "#FFCE53"
	        ],
	        hoverBackgroundColor: [
	        	"#FF6384",
	        	"#36A2EB",
	        	"#FFCE56",
	        	"#FF6381",
			"#36A2E2",
	                "#FFCE53"
	        ]
              }
       	   ]
        };                 
	
	var descr:string;
	var j = -1;	
	for (var i = 0; len > i; i++) {
	  descr = weather.wdata[i].description;
	  j = pieChartData.datasets.findDescription("description", descr); //findIndex(findDescription);
	  if (j >= 0) {	// found already - increase
		console.log("found descr="+descr+", j="+j+", "+pieChartData[j]);
		pieChartData.data[i] = pieChartData.data[i]+1;
		j = -1;
	  } else {	// not found - add
		pieChartData.labels.push(descr);
		pieChartData.data.push(1);
	  }

	  //pieChartData.labels.push(i);
	  //pieChartData.datasets[0].data.push(weather.wdata[i].description);	   	 	    
    	}
    	return pieChartData; 
    }
    
    
    //function 
    Array.prototype.findDescription = function (name, value) { 
    	for (var i = 0; i < this.length; i++) {
	        if (this[i][name] == value) {
	            return i;
	        }
	}
    	return -1;
        //return description === 'descr';  //pieChartData.datasets.description === 'descr';
    }
    

}
