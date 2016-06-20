import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {HomeComponent} from './home';
import {WeatherComponent} from './weather';
import {Grid1Component} from './grid1';
import {Grid2Component} from './grid2';


@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <h1>Get Weather app</h1>
    <div>
      <a [routerLink]="['/']">Home</a>
      <a [routerLink]="['/weather']">Weather</a>
      <a [routerLink]="['/grid1']">Grid1</a>
      <a [routerLink]="['/grid2']">Grid2</a>
    </div>
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})

@Routes( [
  {path: '/', component: HomeComponent},
  {path: '/weather', component: WeatherComponent},
  {path: '/grid1', component: Grid1Component}, //, name: 'Grid1'},
  {path: '/grid2', component: Grid2Component} //, name: 'Grid2'}
] )

export class AppComponent {}
