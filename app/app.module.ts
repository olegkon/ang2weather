import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';
import { AppComponent } from './components/app';
import { HomeComponent } from './components/home';
import { WeatherComponent } from './components/weather';
import {
  WEATHER_URL_BASE,
  WEATHER_URL_SUFFIX,
  WeatherService
} from './services/weather.service';

import {AgGridModule} from 'ag-grid-ng2/main';
//import {Grid1Component} from "./components/grid1";
import {Grid2Component} from "./components/grid2";
import {PrimeNGComponent} from "./components/primeng";

import {DataTableModule,DataGridModule,SharedModule,ChartModule} from 'primeng/primeng';


@NgModule({
  imports: [BrowserModule, HttpModule, ReactiveFormsModule, routing , AgGridModule.forRoot(), DataTableModule, DataGridModule, SharedModule, ChartModule],
  declarations: [AppComponent, HomeComponent, WeatherComponent, Grid2Component, PrimeNGComponent],  //Grid1Component,
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy,   useClass: HashLocationStrategy },
    { provide: WEATHER_URL_BASE,   useValue: 'http://api.openweathermap.org/data/2.5/forecast?q='},  //OK: forecast, was weather weather?q=' },
    { provide: WEATHER_URL_SUFFIX, useValue: '&units=imperial&appid=ca3f6d6ca3973a518834983d0b318f73' },
    WeatherService
  ]
})
export class AppModule {}
