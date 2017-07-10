import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { Position as LocalPosition } from "../../shared/position/position";
import { Activity } from "../../shared/activity/activity";
import * as ImageModule from "tns-core-modules/ui/image";
import { SearchBar } from "ui/search-bar";
import { Button } from "ui/button";
import { Page } from "ui/page";
import { Color } from "color";
import { EventData } from "data/observable";
import * as Geolocation from "nativescript-geolocation";
import { TnsSideDrawer } from 'nativescript-sidedrawer';
import * as ApplicationSettings from "application-settings";

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

  constructor(private routerExtensions: RouterExtensions, private page: Page, private zone: NgZone) {
    this.position = new LocalPosition(
      ApplicationSettings.getNumber("latitude", 33.86),
      ApplicationSettings.getNumber("longitude", 51.2),
      ApplicationSettings.getNumber("zoom", 4));
    this.activityList = [];
  }

  ngOnInit() {
    console.log("Page - map");
    this.page.actionBarHidden = true;
    let white = new Color("#383838");
    TnsSideDrawer.build({
      templates: [{
        title: 'Nearby',
      }, {
        title: 'Browse activities',
      }, {
        title: 'Your activities',
      }, {
        title: 'Payment',
      }, {
        title: 'Settings',
      }],
      title: 'Geo-wiki alpha',
      subtitle: 'Alpha test for devs!',
      backgroundColor: white,
      listener: (index) => {
          switch (index) {
            case 0:
              this.routerExtensions.navigate(["/map"], {
                transition: {
                  name: "fade",
                  duration: 500,
                  curve: "linear"
                }
              });
            break;
            case 1:
              this.routerExtensions.navigate(["/browser"], {
                transition: {
                  name: "fade",
                  duration: 500,
                  curve: "linear"
                }
              });
            break;
            case 2:
              this.routerExtensions.navigate(["/activities"], {
                transition: {
                  name: "fade",
                  duration: 500,
                  curve: "linear"
                }
              });
            break;
            case 3:
              this.routerExtensions.navigate(["/payment"], {
                transition: {
                  name: "fade",
                  duration: 500,
                  curve: "linear"
                }
              });
            break;
            case 4:
              this.routerExtensions.navigate(["settings"], {
                transition: {
                  name: "fade",
                  duration: 500,
                  curve: "linear"
                }
              });
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
    this.getDeviceLocation().then(location => {
      if (location) {
        ApplicationSettings.setNumber("latitude", location.latitude);
        ApplicationSettings.setNumber("longitude", location.longitude);
        ApplicationSettings.setNumber("zoom", 14);
        this.zone.run(() => {
          this.position.latitude = location.latitude;
          this.position.longitude = location.longitude;
          this.position.zoom = 14;
        });
      }

      this.mapView = event.object;
      this.mapView.gMap.setMyLocationEnabled(true);
      this.mapView.settings.myLocationButtonEnabled = false;

      const style = require('./style.json');
      this.mapView.setStyle(style);

      return this.readMockup();
    }).then(content => {
      let activityList = [];
      try {
        let json = JSON.parse(content);
        json.results.forEach(entity => {
          this.activityList.push(entity);
        });
        let temp: Activity;
        let index = this.getMockupMarker();

        if (index) {
          this.addMockupMarkerToMap(index);
        }
      } catch (err) {
        throw new Error('Could not parse JSON file: ' + err);
      }
    });
  };

  private addMockupMarkerToMap(index: number) {
    let temp: Activity = this.activityList[index];
    console.log("marker found.");
    let marker = new Marker();
    marker.position = Position.positionFromLatLng(temp.latitude, temp.longitude);
    marker.title = temp.place;
    marker.snippet = Activity.getI18n(temp, 'title', 'en');
    marker.userData = {index: index};
    this.mapView.addMarker(marker);
  }

  private readMockup() {
    var documents = fs.knownFolders.documents();
    var myFile = documents.getFile("app/mockup/activities.json");
    return myFile.readText();
  }

  private getMockupMarker() {
    let index;

    // Show Saint-Raphael
    let saintRaphael = new LocalPosition(43.4582431, 6.8134527);
    if (this.position.isWithin(saintRaphael, 5)) {
      index = 1;
    }

    // Show Geneva
    let geneva = new LocalPosition(46.2050282, 6.126579);
    if (this.position.isWithin(geneva, 5)) {
      index = 3;
    }

    // Show Colombo
    let colombo = new LocalPosition(6.9215466, 79.8212827);
    if (this.position.isWithin(colombo, 5)) {
      index = 0;
    }

    // Show Negombo
    let negombo = new LocalPosition(7.1894442, 79.7884597);
    if (this.position.isWithin(negombo, 5)) {
      index = 2;
    }

    return index;
  }

  onTap(args: EventData) {
    let button = <Button>args.object;
    this.routerExtensions.navigate(["/activities"], {
      transition: {
        name: "fade",
        duration: 500,
        curve: "linear"
      }
    });
  }

  onMenuTap(args: EventData) {
    TnsSideDrawer.toggle();
  }

  onMarkerInfoWindowEvent(args) {
    let index = args.marker.userData.index;
    this.routerExtensions.navigate(["/activity"], {
      transition: {
        name: "fade",
        duration: 500,
        curve: "linear"
      },
      queryParams: {
        item: JSON.stringify(this.activityList[index])
      }
    });
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
