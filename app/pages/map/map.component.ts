import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { Position as LocalPosition } from "../../shared/position/position";
import { Activity } from "../../shared/activity/activity";
import * as ImageModule from "tns-core-modules/ui/image";
import { SearchBar } from "ui/search-bar";
import { Button } from "ui/button";
import { Page } from "ui/page";
import { EventData } from "data/observable";
import * as Geolocation from "nativescript-geolocation";
import { TnsSideDrawer } from 'nativescript-sidedrawer';

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

  constructor(private router: Router, private page: Page, private zone: NgZone) {
    this.position = new LocalPosition(-33.86, 151.20);
    this.zoom = 14;
    this.activityList = [];
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
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

    // image.set
    TnsSideDrawer.build({
      templates: [{
        title: 'Nearby',
      }, {
        title: 'Activities',
      }, {
        title: 'Bank Roll',
      }, {
        title: 'Fix Stuff',
      }, {
        title: 'This Is Me',
      }],
      title: 'Geo-wiki alpha',
      subtitle: 'Alpha test for devs!',
      listener: (index) => {
          switch (index) {
            case 0:
              this.router.navigate(["/map"]);
            break;
            case 1:
              this.router.navigate(["/activities"]);
            break;
          }
      },
      context: this,
    });
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
    this.mapView.gMap.setMyLocationEnabled(true);
    this.mapView.settings.myLocationButtonEnabled = false;

    const style = require('./style.json');
    this.mapView.setStyle(style);

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
          let saintRaphael = new LocalPosition(43.4582431, 6.8134527);
          if (this.position.isWithin(saintRaphael, 5)) {
            temp = this.activityList[1];
          }

          // Show Geneva
          let geneva = new LocalPosition(46.2050282, 6.126579);
          if (this.position.isWithin(geneva, 5)) {
            temp = this.activityList[3];
          }

          // Show Colombo
          let colombo = new LocalPosition(6.9215466, 79.8212827);
          if (this.position.isWithin(colombo, 5)) {
            temp = this.activityList[3];
          }

          // Show Negombo
          let negombo = new LocalPosition(7.1894442, 79.7884597);
          if (this.position.isWithin(negombo, 5)) {
            temp = this.activityList[3];
          }

          if (temp) {
            console.log("marker found.");
            let marker = new Marker();
            marker.position = Position.positionFromLatLng(temp.latitude, temp.longitude);
            marker.title = temp.place;
            marker.snippet = temp.text;
            marker.userData = {index: 1};
            this.mapView.addMarker(marker);
          }

          // let owner = new Marker();
          // owner.position = Position.positionFromLatLng(this.position.latitude, this.position.longitude);
          // owner.icon = "center_small";
          // owner.title = "Your position";
          // owner.snippet = this.position.latitude + "," + this.position.longitude;
          // this.mapView.addMarker(owner);
        } catch (err) {
          throw new Error('Could not parse JSON file. 1.' + err);
        }
      }, function (error) {
        throw new Error('Could not read JSON file. 2.');
      });
  };

  onTap(args: EventData) {
    let button = <Button>args.object;
    this.router.navigate(["/activities"]);
  }

  onMenuTap(args: EventData) {
    TnsSideDrawer.toggle();
  }

  private getDeviceLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      Geolocation.enableLocationRequest().then(() => {
        Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
          resolve(location);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }
}
