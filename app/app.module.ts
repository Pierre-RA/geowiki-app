import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import * as platform from "platform";
declare var GMSServices: any;

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

import { TrimNamePipe } from "./pipes/trim.pipe";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    TrimNamePipe,
    ...navigatableComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
