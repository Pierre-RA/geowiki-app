import { Activity } from '../../shared/activity/activity';
import { ActivityListService } from '../../shared/activity/activity-list.service';

import { RouterExtensions } from "nativescript-angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";

import * as fs from "tns-core-modules/file-system";

@Component({
  selector: "list",
  templateUrl: "pages/activities/activities.html",
  styleUrls: ["pages/activities/activities-common.css", "pages/activities/activities.css"]
})
export class ActivitiesComponent implements OnInit {
  public activityList: Array<Object> = [];

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    var documents = fs.knownFolders.documents();
    var myFile = documents.getFile("app/mockup/activities.json");
    let activityList = [];
    return myFile.readText()
      .then(content => {
        try {
          let json = JSON.parse(content);
          json.results.forEach(entity => {
            entity.gps = entity.latitude + ' x ' + entity.longitude;
            entity.text = entity.description.en || 'no description';
            this.activityList.push(entity);
          });
        } catch (err) {
          throw new Error('Could not parse JSON file');
        }
      }, function (error) {
        throw new Error('Could not read JSON file');
      });
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
