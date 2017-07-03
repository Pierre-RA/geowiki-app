import { Component, ElementRef, ViewChild } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

registerElement('MapView', () => MapView);
// registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent {

  @ViewChild("MapView") mapView: ElementRef;

  //Map events
  onMapReady = (event) => {
    // this.mapView.setStyle();
    console.log("Map Ready");
  };
}
