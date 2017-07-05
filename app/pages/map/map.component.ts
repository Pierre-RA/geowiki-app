import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { Position as LocalPosition } from "../../shared/position/position";
import { Activity } from "../../shared/activity/activity";
import * as ImageModule from "tns-core-modules/ui/image";
import { SearchBar } from "ui/search-bar";
import * as Geolocation from "nativescript-geolocation";

import * as fs from "tns-core-modules/file-system";

// registerElement('MapView', () => MapView);
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

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

  onSearchBarLoaded = (event) => {
    if(event.object.android) {
      event.object.dismissSoftInput();
      event.object.android.clearFocus();
      event.object.android.setFocusable(false);
    }
  }

  onSubmit = (event) => {
    let searchBar = <SearchBar>event.object;
    console.log(searchBar.text);
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

          let marker = new Marker();
          marker.position = Position.positionFromLatLng(temp.latitude, temp.longitude);
          marker.title = temp.place;
          marker.snippet = temp.text;
          marker.userData = {index: 1};
          this.mapView.addMarker(marker);

          let owner = new Marker();
          owner.position = Position.positionFromLatLng(this.position.latitude, this.position.longitude);
          owner.icon = "center_small";
          owner.title = "Your position";
          owner.snippet = this.position.latitude + "," + this.position.longitude;
          this.mapView.addMarker(owner);
        } catch (err) {
          throw new Error('Could not parse JSON file. 1.' + err);
        }
      }, function (error) {
        throw new Error('Could not read JSON file. 2.');
      });
  };
}
