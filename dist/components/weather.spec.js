"use strict";
var testing_1 = require('@angular/core/testing');
var forms_1 = require('@angular/forms');
require('rxjs/add/observable/empty');
var weather_1 = require('./weather');
var weather_service_1 = require('../services/weather.service');
describe('WeatherComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule],
            declarations: [weather_1.WeatherComponent],
            providers: [{ provide: weather_service_1.WeatherService, useValue: {} }]
        });
    });
    it('should display the weather ', function () {
        var fixture = testing_1.TestBed.createComponent(weather_1.WeatherComponent);
        var element = fixture.nativeElement;
        var component = fixture.componentInstance;
        //component.weather = {place: 'New York', country: 'USA', humidity: 44, temperature: 57,  wdata: null};
        fixture.detectChanges();
        expect(element.querySelector('h3').innerHTML).toBe('Current weather in New York:');
        expect(element.querySelector('li:nth-of-type(1)').innerHTML).toBe('Temperature: 57F');
        expect(element.querySelector('li:nth-of-type(2)').innerHTML).toBe('Humidity: 44%');
    });
});
//# sourceMappingURL=weather.spec.js.map