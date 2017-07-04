import { Component, ElementRef, ViewChild } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as geolocation from "nativescript-geolocation";

import * as fs from "tns-core-modules/file-system";

registerElement('MapView', () => MapView);

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent {

  // @ViewChild("MapView") mapView: ElementRef;
  mapView: MapView;
  public activityList: Array<Object> = [];
  latitude =  -33.86;
  longitude = 151.20;
  zoom = 14;

  //Map events
  onMapReady = (event) => {
    // this.mapView.setStyle();

    this.mapView = event.object;

    // Load mockup document
    var documents = fs.knownFolders.documents();
    var myFile = documents.getFile("app/mockup/activities.json");
    let activityList = [];
    myFile.readText()
      .then(content => {
        try {
          let json = JSON.parse(content);
          json.results.forEach(entity => {
            entity.gps = entity.latitude + ' x ' + entity.longitude;
            entity.text = entity.description.en || 'no description';
            this.activityList.push(entity);
          });
          let temp;
          // Show Saint-Raphael
          if (true) {
            temp = this.activityList[1];
            console.log(temp);
          }

          var marker = new Marker();
          marker.position = Position.positionFromLatLng(temp.latitude, temp.longitude);
          marker.title = temp.place;
          marker.snippet = temp.text;
          marker.userData = {index: 1};
          this.mapView.addMarker(marker);
        } catch (err) {
          throw new Error('Could not parse JSON file. 1.' + err);
        }
      }, function (error) {
        throw new Error('Could not read JSON file. 2.');
      });
  };
}
