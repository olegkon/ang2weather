"use strict";
var testing_1 = require('@angular/core/testing');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var testing_2 = require('@angular/router/testing');
var app_routing_1 = require('../app.routing');
var weather_service_1 = require('../services/weather.service');
var app_1 = require('./app');
var home_1 = require('../components/home');
var weather_1 = require('../components/weather');
describe('Router', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, testing_2.RouterTestingModule,
                testing_2.RouterTestingModule.withRoutes(app_routing_1.routes)],
            declarations: [app_1.AppComponent, home_1.HomeComponent, weather_1.WeatherComponent],
            providers: [
                // In this spec file we test navigation to WeatherComponent which in turn
                // injects WeatherService, so we need to register a provider for the
                // service here. However since we do not test the actual service here,
                // we can provide a mock object, e.g. an object literal:
                { provide: weather_service_1.WeatherService, useValue: {} }
            ]
        });
    });
    it('should be able to navigate to home using commands API', testing_1.fakeAsync(testing_1.inject([router_1.Router, common_1.Location], function (router, location) {
        testing_1.TestBed.createComponent(app_1.AppComponent);
        router.navigate(['/']);
        testing_1.tick();
        expect(location.path()).toBe('/');
    })));
    it('should be able to navigate to weather using commands API', testing_1.fakeAsync(testing_1.inject([router_1.Router, common_1.Location], function (router, location) {
        testing_1.TestBed.createComponent(app_1.AppComponent);
        router.navigate(['/weather']);
        testing_1.tick();
        expect(location.path()).toBe('/weather');
    })));
    it('should be able to navigate to weather by URL', testing_1.fakeAsync(testing_1.inject([router_1.Router, common_1.Location], function (router, location) {
        testing_1.TestBed.createComponent(app_1.AppComponent);
        router.navigateByUrl('/weather');
        testing_1.tick();
        expect(location.path()).toEqual('/weather');
    })));
});
//# sourceMappingURL=app.spec.js.map