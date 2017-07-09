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

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
    this.item = new Activity();
    this.route.queryParams.subscribe(params => {
      this.item = JSON.parse(params["item"]);
      let duration = moment.duration(Number(this.item.duration), "m").humanize();
      this.item.duration = duration;
      this.text = Activity.getI18n(this.item, 'description', 'en');
      this.price = Price.toString(this.item.price);
      this.title = Activity.getI18n(this.item, 'title', 'en');
    });
  }

  ngOnInit() {
    console.log('PAGE - activity');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
