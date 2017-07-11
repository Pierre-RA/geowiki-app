import { Component, OnInit } from "@angular/core";
import * as ApplicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: "main",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    if (!ApplicationSettings.getBoolean("logged")) {
      console.log("map: not logged");
      this.routerExtensions.navigate(["/login"], {
        clearHistory: true,
        transition: {
          name: "fade",
          duration: 500,
          curve: "linear"
        }
      });
    }
  }
}
