"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var weather_service_1 = require('./weather.service');
describe('WeatherService', function () {
    var mockBackend;
    var service;
    var injector;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend },
                { provide: weather_service_1.WEATHER_URL_BASE, useValue: '' },
                { provide: weather_service_1.WEATHER_URL_SUFFIX, useValue: '' },
                weather_service_1.WeatherService
            ]
        });
        injector = testing_1.getTestBed();
    });
    beforeEach(function () {
        mockBackend = injector.get(http_1.XHRBackend);
        service = injector.get(weather_service_1.WeatherService);
    });
    it('getWeather() should return weather for New York', testing_1.async(function () {
        var mockResponseData = {
            cod: '200',
            list: [{
                    name: 'New York',
                    main: {
                        temp: 57,
                        humidity: 44
                    }
                }]
        };
        mockBackend.connections.subscribe(function (connection) {
            var responseOpts = new http_1.ResponseOptions({ body: JSON.stringify(mockResponseData) });
            connection.mockRespond(new http_1.Response(responseOpts));
        });
        service.getWeather('New York').subscribe(function (weather) {
            expect(weather.place).toBe('New York');
            expect(weather.humidity).toBe(44);
            expect(weather.temperature).toBe(57);
        });
    }));
});
//# sourceMappingURL=weather.service.spec.js.map