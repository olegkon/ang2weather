import {Component} from '@angular/core';
import {Control} from '@angular/common';

import {AgGridNg2} from 'ag-grid-ng2/main';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
 
import {WeatherService, WeatherResult} from '../services/weather.service';
import {weatherRow} from "./weatherRow";


@Component({
    selector: 'my-grid2',
    directives: [AgGridNg2],
    template: `
    	<br/>
    	<h2>Grid2 Component</h2> 
    	
    	<input type="text" placeholder="Enter city" [ngFormControl]="searchInput1"/>
		    
      	<h3>Current weather in {{weather?.place}} {{weather?.country}}:</h3>      	
    	<!-- br/ -->    	
    	    	
    	<h3>Temperature today: {{myData?.temperature}}</h3>
      	
    	<br/>
    	
         <ag-grid-ng2 #agGrid style="height:100%; width:845px" class="ag-fresh" [gridOptions]="gridOptions">
         </ag-grid-ng2 >
     `
})
 
 
export class Grid2Component {


 myRowData = []; // this.myData ; //[ this.myData ];  //];  this.weather.wdata; //
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
*/
/*
{ temperature: {{weather?.temperature}},
    humidity: {{weather?.humidity}},
    pressure: {{weather?.pressure}},
    wind: {{weather?.wind}},
    precipitation: {{weather?.precip}},
    clouds: {{weather?.clouds}},
    min_temp: {{weather?.temp_min}},
    max_temp: {{weather?.temp_max}}
}
];
*/
 
 columnDefs = [
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

/*
    myRowData = [
        {"name":"Ronald Bowman","country":"China","city":"Lutou","email":"rbowman0@spotify.com"},
        {"name":"Pamela Hill","country":"Russia","city":"Krylovskaya","email":"phill1@symantec.com"},
        {"name":"Robin Andrews","country":"Ukraine","city":"Korop","email":"randrews2@photobucket.com"},
        {"name":"Peter Kim","country":"Mexico","city":"San Jose","email":"pkim3@theatlantic.com"},
        {"name":"Carol Foster","country":"Mexico","city":"El Aguacate","email":"cfoster8@intel.com"},
        {"name":"Jimmy Burke","country":"Indonesia","city":"Banjarsari","email":"jburke9@over-blog.com"},
        {"name":"Jonathan Crawford","country":"Peru","city":"Alca","email":"jcrawforda@deliciousdays.com"},
        {"name":"Donald Montgomery","country":"Poland","city":"Dzialoszyce","email":"dmontgomeryb@google.com.br"},
        {"name":"Donna Shaw","country":"Japan","city":"Akune","email":"dshawc@chronoengine.com"},
        {"name":"Helen King","country":"United States","city":"Hollywood","email":"hkingd@devhub.com"},
        {"name":"Walter Myers","country":"China","city":"a ndaowa n", "email":"wmyerse@state.tx.us"},
        {"name":" Alice Collins","country":"Papua Nw  Guine a", "city":"Mendi","email":"acollinsf@npr.org"},
        {"name":"Anne Richards","country":"China","city":"Koramlik","email":"arichardsu@vinaora.com"},
        {"name":"Randy Miller","country":"Indonesia","city":"Trenggulunan","email":"rmillerv@oakley.com"},
        {"name":"Phillip Adams","country":"Bahamas","city":"Duncan Town","email":"padamsw@lycos.com"},
        {"name":"Nicholas Allen","country":"Philippines","city":"Bautista","email":"nallenx@aboutads.info"},
        {"name":"Lisa Willis","country":"Thailand","city":"Lat Yao","email":"lwillisy@istockphoto.com"},
        {"name":"Jeffrey Castillo","country":"Indonesia","city":"Karangsari","email":"jcastilloz@washington.edu"},
        {"name":"Michael Carpenter","country":"Colombia","city":"Cali","email":"mcarpenter13@prlog.org"},
        {"name":"Roger Lee","country":"France","city":"Courtaboeuf","email":"rlee14@earthlink.net"},
        {"name":"Steve Wallace","country":"Russia","city":"Novobeysugskaya","email":"swallace15@cisco.com"}
        //, {"name":"Shirley Patterson","country":"Peru","city":"La Tingui�a","email":"spatterson16@woothemes.com"},
        //{"name":"Nancy Ward","country":"Sweden","city":"B�stad","email":"nward17@mapquest.com"}
    ];
 
    columnDefs = [
        {headerName: 'Name 2', field: "name", width:200},
        {headerName: 'Country 2', field: "country", width:180},
        {headerName: 'City 2', field: "city", width:160},
        {headerName: 'e-mail 2', field: "email", width:300}
    ];
*/

    gridOptions = [];
    
    
    searchInput1: Control;
    weather: WeatherResult;

    myData:weatherRow; // = weather.wdata[0];

    
    constructor(weatherService: WeatherService) {    	  
    
        this.searchInput1 = new Control('');
        this.searchInput1.valueChanges
            .debounceTime(300)
            .switchMap((place: string) => weatherService.getWeather(place))
            .subscribe(
                (weather: WeatherResult) =>  { this.weather = weather; this.myData = weather.wdata[0] } ,
                error => console.error(error),
                () => console.log('Weather is retrieved'));



        this.gridOptions = {	// for a grid
            rowData: this.myRowData,
            columnDefs: this.columnDefs,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true
        } 
  }
}


