import { LoginComponent } from "./pages/login/login.component";
import { ActivitiesComponent } from "./pages/activities/activities.component";
import { MapComponent } from "./pages/map/map.component";
import { PaymentComponent } from "./pages/payment/payment.component";
import { BrowserComponent } from "./pages/browser/browser.component";
import { SettingsComponent } from "./pages/settings/settings.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "activities", component: ActivitiesComponent },
  { path: "map", component: MapComponent },
  { path: "payment", component: PaymentComponent },
  { path: "browser", component: BrowserComponent },
  // { path: "settings", component: SettingsComponent },
];

export const navigatableComponents = [
  LoginComponent,
  ActivitiesComponent,
  MapComponent,
  PaymentComponent,
  BrowserComponent,
  // SettingsComponent
];
