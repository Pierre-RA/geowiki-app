import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  moduleId: module.id,
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})

export class PaymentComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    console.log('PAGE - payment');
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}
