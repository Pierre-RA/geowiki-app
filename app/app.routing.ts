import { LoginComponent } from "./pages/login/login.component";
import { ActivitiesComponent } from "./pages/activities/activities.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "activities", component: ActivitiesComponent }
];

export const navigatableComponents = [
  LoginComponent,
  ActivitiesComponent
];
