import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRoutes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from '../app.routing';
import { WeatherService } from '../services/weather.service';
import { AppComponent } from './app';
import { HomeComponent } from '../components/home';
import { WeatherComponent } from '../components/weather';
//import {Grid1Component} from "../components/grid1";
import {Grid2Component} from "../components/grid2";


import {AgGridModule} from 'ag-grid-ng2/main';


describe('Router', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule,
          RouterTestingModule.withRoutes(routes), AgGridModule],
      declarations: [AppComponent, HomeComponent, WeatherComponent, Grid2Component ],  //Grid1Component, Grid2Component
      providers: [

        // In this spec file we test navigation to WeatherComponent which in turn
        // injects WeatherService, so we need to register a provider for the
        // service here. However since we do not test the actual service here,
        // we can provide a mock object, e.g. an object literal:
        {provide: WeatherService, useValue: {} }
      ]
    })
  });

  it('should be able to navigate to home using commands API',
    fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
      TestBed.createComponent(AppComponent);
      router.navigate(['/']);
      tick();
      expect(location.path()).toBe('/');
    })
  ));

  it('should be able to navigate to weather using commands API',
    fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
      TestBed.createComponent(AppComponent);
      router.navigate(['/weather']);
      tick();
      expect(location.path()).toBe('/weather');
    })
  ));

  it('should be able to navigate to weather by URL',
    fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
      TestBed.createComponent(AppComponent);
      router.navigateByUrl('/weather');
      tick();
      expect(location.path()).toEqual('/weather');
    })
  ));

});
