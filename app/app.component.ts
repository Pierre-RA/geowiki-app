import { Component, OnInit } from "@angular/core";
import * as ApplicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";

import * as fs from "tns-core-modules/file-system";

@Component({
  selector: "main",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {
    if (!ApplicationSettings.getBoolean("hasUserInfo")) {
      this.readMockup("app/mockup/user.json").then(content => {
        ApplicationSettings.setString("user", content);
        ApplicationSettings.setBoolean("hasUserInfo", true);
      });
    }
  }

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

  private readMockup(file) {
    var documents = fs.knownFolders.documents();
    var myFile = documents.getFile(file);
    return myFile.readText();
  }
}
