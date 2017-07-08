import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  moduleId: module.id,
  selector: 'browser',
  templateUrl: './browser.html',
  styleUrls: ['./browser.css']
})

export class BrowserComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    console.log('PAGE - browser');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
