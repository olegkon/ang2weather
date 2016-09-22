"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
//import {Control} from '@angular/common';
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/switchMap');
var weather_service_1 = require('../services/weather.service');
var Grid2Component = (function () {
    //myData:weatherRow; // = weather.wdata[0];
    function Grid2Component(weatherService) {
        var _this = this;
        this.searchInput1 = new forms_1.FormControl('');
        this.searchInput1.valueChanges
            .debounceTime(300)
            .switchMap(function (place) { return weatherService.getWeather(place); })
            .subscribe(function (weather) { return _this.weather = weather; }, function (error) { return console.error(error); }, function () { return console.log('Weather is retrieved'); });
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
    Grid2Component.prototype.createColumnDefs = function () {
        return [
            { headerName: 'Day', field: "day", width: 65 },
            { headerName: 'Temperature', field: "temperature", width: 125 },
            { headerName: 'Humidity', field: "humidity", width: 80 },
            { headerName: 'Pressure', field: "pressure", width: 100 },
            { headerName: 'Wind', field: "wind", width: 80 },
            { headerName: 'Precipitation', field: "precipitation", width: 125 },
            { headerName: 'Clouds', field: "clouds", width: 100 },
            { headerName: 'Min Temp', field: "min_temp", width: 80 },
            { headerName: 'Max Temp', field: "max_temp", width: 80 }
        ];
    };
    Grid2Component = __decorate([
        core_1.Component({
            selector: 'my-grid2',
            template: "\n    \t<br/>\n    \t<h2>Grid2 Component</h2> \n    \t\n    \t<input type=\"text\" placeholder=\"Enter city\" [ngFormControl]=\"searchInput1\"/>\n\t\t    \n      \t<h3>Current weather in {{weather?.place}} </h3>      \t\n    \t<!-- br/ -->        \t    \t\n    \t<ul>\n            <li>Temperature: {{weather?.temperature}}F</li>\n            <li>Humidity: {{weather?.humidity}}%</li>\n        </ul>   \t\n    \t<br/>        \n     "
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], Grid2Component);
    return Grid2Component;
}());
exports.Grid2Component = Grid2Component;
//# sourceMappingURL=grid2.js.map