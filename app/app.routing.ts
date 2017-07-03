import { LoginComponent } from "./pages/login/login.component";
import { ActivitiesComponent } from "./pages/activities/activities.component";
import { MapComponent } from "./pages/map/map.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "activities", component: ActivitiesComponent },
  { path: "map", component: MapComponent }
];

export const navigatableComponents = [
  LoginComponent,
  ActivitiesComponent,
  MapComponent
];
