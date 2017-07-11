import { Activity } from '../../shared/activity/activity';
import { ActivityListService } from '../../shared/activity/activity-list.service';

import { RouterExtensions } from "nativescript-angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { Page } from "ui/page";

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
    var myFile = documents.getFile("app/mockup/user.json");
    let activityList = [];
    return myFile.readText()
      .then(content => {
        try {
          let json = JSON.parse(content);
          json.activities.forEach(entity => {
            this.activityList.push(entity);
          });
        } catch (err) {
          throw new Error('Could not parse JSON file');
        }
      }, function (error) {
        throw new Error('Could not read JSON file');
      });
  }

  onIndexChanged(event) {
    console.log("tab changed.");
  }

  onBackTap() {
    this.routerExtensions.back();
  }

  goTo(item: Activity) {
    console.log(item.place);
  }
}
