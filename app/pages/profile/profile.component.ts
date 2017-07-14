import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import * as ApplicationSettings from "application-settings";
import { User } from "../../shared/user/user";

@Component({
  moduleId: module.id,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  private user: User;

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params.user) {
        this.user = new User().deserialize(JSON.parse(params.user));
      } else {
        let json = JSON.parse(ApplicationSettings.getString("user"));
        this.user = new User().deserialize(json);
      }
    });
  }

  ngOnInit() {
    console.log('PAGE - profile');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
