import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home';
import { WeatherComponent } from './components/weather';
//import {Grid1Component} from './components/grid1';
import {Grid2Component} from './components/grid2';
import {PrimeNGComponent} from "./components/primeng";


export const routes: Routes = [
  { path: '',        component: HomeComponent },
  { path: 'weather', component: WeatherComponent },
//  { path: 'grid1', component: Grid1Component},
  { path: 'grid2', component: Grid2Component},
  { path: 'primeng', component: PrimeNGComponent}
];


export const routing = RouterModule.forRoot(routes);
