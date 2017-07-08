import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from '../../shared/user/user';
import { UserService } from "../../shared/user/user.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import * as LabelModule from "tns-core-modules/ui/label";

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  @ViewChild("container") container: ElementRef;

  constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page) {
    this.user = new User();
    this.user.email = "pierre.repetto@gmail.com";
    this.user.password = "bull";
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;
    // container.animate({
    //   // backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
    //   duration: 200
    // });
  }
  login() {
    this.routerExtensions.navigate(["/map"], { clearHistory: true });
//    this.userService.login(this.user)
//    .subscribe(
//      () => this.router.navigate(["/list"]),
//      (error) => alert("Unfortunately we could not find your account.")
//    );
  }
  signUp() {
    // this.router.navigate(['/map']);
    // this.userService.register(this.user)
    //   .subscribe(
    //     () => {
    //       alert("Your account was successfully created.");
    //       this.toggleDisplay();
    //     },
    //     () => alert("Unfortunately we were unable to create your account.")
    //   );
  }
  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://electric";
    this.page.css = 'page {background-size: cover}';
  }
}
