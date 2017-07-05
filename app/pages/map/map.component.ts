import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { Position as LocalPosition } from "../../shared/position/position";
import { Activity } from "../../shared/activity/activity";
import * as Geolocation from "nativescript-geolocation";

import * as fs from "tns-core-modules/file-system";

registerElement('MapView', () => MapView);

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent implements OnInit {

  mapView: MapView;
  activityList: Array<Activity>;
  position: LocalPosition;
  zoom: number;

  constructor(private zone: NgZone) {
    this.position = new LocalPosition(-33.86, 151.20);
    this.zoom = 14;
    this.activityList = [];
  }

  ngOnInit() {
    Geolocation.watchLocation(location => {
      if(location) {
        this.zone.run(() => {
          this.position.latitude = location.latitude;
          this.position.longitude = location.longitude;
        });
      }
    }, error => {
      console.error(error);
    }, { updateDistance: 1, minimumUpdateTime: 1000 });
  }

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
            entity.text = entity.description.en || 'no description';
            this.activityList.push(entity);
          });
          let temp: Activity;
          // Show Saint-Raphael
          temp = this.activityList[1];
          if (this.position.isWithin(new LocalPosition(temp.latitude, temp.longitude), 2)) {
            console.log("Is within.");
          }

          var marker = new Marker();
          console.log(this.position.latitude + 'x' + this.position.longitude);
          console.log(temp.latitude + 'x' + temp.longitude);
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
