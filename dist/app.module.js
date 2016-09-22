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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var app_routing_1 = require('./app.routing');
var app_1 = require('./components/app');
var home_1 = require('./components/home');
var weather_1 = require('./components/weather');
var weather_service_1 = require('./services/weather.service');
var main_1 = require('ag-grid-ng2/main');
var grid1_1 = require("./components/grid1");
//import {Grid2Component} from "./components/grid2";
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.ReactiveFormsModule, app_routing_1.routing, main_1.AgGridModule.forRoot()],
            declarations: [app_1.AppComponent, home_1.HomeComponent, weather_1.WeatherComponent, grid1_1.Grid1Component],
            bootstrap: [app_1.AppComponent],
            providers: [
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                { provide: weather_service_1.WEATHER_URL_BASE, useValue: 'http://api.openweathermap.org/data/2.5/forecast?q=' },
                { provide: weather_service_1.WEATHER_URL_SUFFIX, useValue: '&units=imperial&appid=ca3f6d6ca3973a518834983d0b318f73' },
                weather_service_1.WeatherService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map