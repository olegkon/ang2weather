import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Get Weather App</h1>
    <div>
      <a [routerLink]="['']">Home</a>
      <a [routerLink]="['weather']">Weather</a>
      <!--a [routerLink]="['grid1']">Grid1</a-->
      <a [routerLink]="['grid2']">Ag-Grid</a>
      <a [routerLink]="['primeng']">PrimeNG</a>
    </div>
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent {}
