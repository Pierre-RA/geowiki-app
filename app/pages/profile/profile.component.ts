import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  moduleId: module.id,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})

export class ProfileComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    console.log('PAGE - profile');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
