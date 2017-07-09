import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

import { Activity } from "../../shared/activity/activity";

import moment = require("moment");

@Component({
  moduleId: module.id,
  templateUrl: './activity.html',
  styleUrls: ['./activity.css']
})

export class ActivityComponent implements OnInit {

  item: Activity;

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
    this.item = new Activity();
    this.route.queryParams.subscribe(params => {
      this.item = JSON.parse(params["item"]);
      let duration = moment.duration(Number(this.item.duration), "m").humanize();
      this.item.duration = duration;
    });
  }

  ngOnInit() {
    console.log('PAGE - activity');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
