"use strict";
var router_1 = require('@angular/router');
var home_1 = require('./components/home');
var weather_1 = require('./components/weather');
var grid1_1 = require('./components/grid1');
//import {Grid2Component} from './components/grid2';
exports.routes = [
    { path: '', component: home_1.HomeComponent },
    { path: 'weather', component: weather_1.WeatherComponent },
    { path: 'grid1', component: grid1_1.Grid1Component } //  , { path: '/grid2', component: Grid2Component} //, name: 'Grid2'}
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routing.js.map