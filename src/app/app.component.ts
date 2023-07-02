import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options = {
    layers: [
      L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        noWrap: true,
        maxZoom: 18,
      }),
    ],
    zoom: 13,
    center: L.latLng(41.38879, 2.15899),
  };
}
