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
  text: string;
  price: string;
  title: string;
  duration: string;

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
    this.item = new Activity();
    this.route.queryParams.subscribe(params => {
      this.item = new Activity().deserialize(JSON.parse(params["item"]));
      this.duration = moment.duration(this.item.duration, "m").humanize();
      this.text = Activity.getI18n(this.item, 'description', 'en');
      this.price = this.item.price.toString();
      this.title = "Title";
      console.log(this.item.owner.avatar);
      try {
        this.title = Activity.getI18n(this.item, 'title', 'en');
      } catch (err) {
        console.error("activity: no title provided");
      }
    });
  }

  ngOnInit() {
    console.log('PAGE - activity');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
