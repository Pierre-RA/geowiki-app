import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

import { Activity } from "../../shared/activity/activity";

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
    });
  }

  ngOnInit() {
    console.log('PAGE - activity');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
