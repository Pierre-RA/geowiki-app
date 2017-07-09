import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  moduleId: module.id,
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})

export class SettingsComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    console.log('PAGE - settings');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
