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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
var weatherRow_1 = require('../components/weatherRow');
exports.WEATHER_URL_BASE = new core_1.OpaqueToken('WeatherUrlBase');
exports.WEATHER_URL_SUFFIX = new core_1.OpaqueToken('WeatherUrlSuffix');
var WeatherService = (function () {
    function WeatherService(http, urlBase, urlSuffix) {
        this.http = http;
        this.urlBase = urlBase;
        this.urlSuffix = urlSuffix;
    }
    WeatherService.prototype.getWeather = function (city) {
        return this.http
            .get(this.urlBase + city + this.urlSuffix)
            .map(function (response) { return response.json(); })
            .filter(this._hasResult)
            .map(this._parseData);
    };
    WeatherService.prototype._hasResult = function (data) {
        return data['cod'] !== '404' && data.main;
    };
    WeatherService.prototype._parseData = function (data) {
        var first = data.list[0];
        var wdata1 = new Array();
        wdata1[0] = new weatherRow_1.weatherRow("Today", data.list[0].main.temp, data.list[0].main.humidity, data.list[0].main.pressure, data.list[0].main.temp_min, data.list[0].main.temp_max, data.list[0].wind.speed, data.list[0].clouds.all, data.list[0].weather[0].description);
        wdata1[1] = new weatherRow_1.weatherRow("Tomorrow", data.list[1].main.temp, data.list[1].main.humidity, data.list[1].main.pressure, data.list[1].main.temp_min, data.list[1].main.temp_max, data.list[1].wind.speed, data.list[1].clouds.all, data.list[1].weather[0].description);
        //   wdata1[0].temperature = data.list[0].main.temp;
        //   wdata1[0].humidity = data.list[0].main.humidity;
        /*
         wdata1[0].temperature = data.list[0].main.temp;
         wdata1[0].humidity = data.list[0].main.humidity;
         wdata1[0].pressure = data.list[0].main.pressure;
         wdata1[0].temp_min = data.list[0].main.temp_min;
         wdata1[0].temp_max = data.list[0].main.temp_max;
         wdata1[0].wind = data.list[0].wind.speed;
         wdata1[0].clouds = data.list[0].clouds.all;
         wdata1[0].precip = data.list[0].weather[0].description;
    
         wdata1[1].temperature = data.list[1].main.temp;
         wdata1[1].humidity = data.list[1].main.humidity;
         wdata1[1].pressure = data.list[1].main.pressure;
         wdata1[1].temp_min = data.list[1].main.temp_min;
         wdata1[1].temp_max = data.list[1].main.temp_max;
         wdata1[1].wind = data.list[1].wind.speed;
         wdata1[1].clouds = data.list[1].clouds.all;
         wdata1[1].precip = data.list[1].weather[0].description;
         */
        return {
            //     place: data.name || 'unknown',
            //     temperature: data.main.temp,
            //     humidity: data.main.humidity
            place: data.city.name || 'unknown',
            country: data.city.country,
            temperature: data.list[0].main.temp,
            humidity: data.list[0].main.humidity,
            pressure: data.list[0].main.pressure,
            temp_min: data.list[0].main.temp_min,
            temp_max: data.list[0].main.temp_max,
            wind: data.list[0].wind.speed,
            clouds: data.list[0].clouds.all,
            precip: data.list[0].weather[0].description,
            temperature1: data.list[1].main.temp,
            humidity1: data.list[1].main.humidity,
            pressure1: data.list[1].main.pressure,
            temp_min1: data.list[1].main.temp_min,
            temp_max1: data.list[1].main.temp_max,
            wind1: data.list[1].wind.speed,
            clouds1: data.list[1].clouds.all,
            precip1: data.list[1].weather[0].description,
            wdata: wdata1
        };
    };
    WeatherService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(exports.WEATHER_URL_BASE)),
        __param(2, core_1.Inject(exports.WEATHER_URL_SUFFIX)), 
        __metadata('design:paramtypes', [http_1.Http, String, String])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map