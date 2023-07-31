import { Component } from '@angular/core';
import * as L from 'leaflet';
import { dogArea } from './sandbox/dog-area';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  map!: L.Map;

  options = {
    layers: [
      L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        noWrap: true,
        minZoom: 13,
        maxZoom: 18,
      }),
    ],
    zoom: 13,
    center: L.latLng(41.38879, 2.15899),
  };

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
      'Open Cycle Map': L.tileLayer(
        'https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
    },
    overlays: {
      'Big Circle': L.circle([41.38879, 2.15899], { radius: 5000 }),
      'Big Square': L.polygon([
        [41.48879, 2.18899],
        [46.9, -121.55],
        [46.9, -121.7],
        [46.8, -121.7],
      ]),
    },
  };

  initMarkers() {
    dogArea.forEach((d) =>
      L.marker([+d.position.lat, +d.position.lng], this.markerIcon)
        .addTo(this.map)
        .bindPopup(this.popupInfo(d.name, d.address))
    );
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.initMarkers();
  }

  popupInfo(name: string, address: string): string {
    return `<h3>${name}</h3><b>${address}</b>`;
  }
}
