import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Switch } from "ui/switch";
import * as ApplicationSettings from "application-settings";

@Component({
  moduleId: module.id,
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {
  public loggedState = "Logged-in";
  private checkedState;

  constructor(private routerExtensions: RouterExtensions) {
    this.checkedState = ApplicationSettings.getBoolean("logged");
  }

  ngOnInit() {
    console.log('PAGE - settings');
  }

  onBackTap() {
    this.routerExtensions.back();
  }

  public onFirstChecked(args) {
    let firstSwitch = <Switch>args.object;
    if (firstSwitch.checked) {
      ApplicationSettings.setBoolean("logged", true);
    } else {
      ApplicationSettings.setBoolean("logged", false);
    }
  }
}
