import { LoginComponent } from "./pages/login/login.component";
import { ActivitiesComponent } from "./pages/activities/activities.component";
import { MapComponent } from "./pages/map/map.component";
import { PaymentComponent } from "./pages/payment/payment.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "activities", component: ActivitiesComponent },
  { path: "map", component: MapComponent },
  { path: "payment", component: PaymentComponent },
];

export const navigatableComponents = [
  LoginComponent,
  ActivitiesComponent,
  MapComponent,
  PaymentComponent,
];
