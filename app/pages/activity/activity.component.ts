import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

import { Activity, Price } from "../../shared/activity/activity";

import moment = require("moment");

@Component({
  moduleId: module.id,
  templateUrl: './activity.html',
  styleUrls: ['./activity.css']
})

export class ActivityComponent implements OnInit {

  item: Activity;
  price: string;
  duration: string;

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
    this.item = new Activity();
    this.route.queryParams.subscribe(params => {
      this.item = new Activity().deserialize(JSON.parse(params["item"]));
      this.duration = moment.duration(this.item.duration, "m").humanize();
      this.price = this.item.price.toString();
    });
  }

  ngOnInit() {
    console.log('PAGE - activity');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
