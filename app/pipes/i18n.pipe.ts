import { Pipe, PipeTransform } from "@angular/core";
import * as ApplicationSettings from "application-settings";
import { Description } from "../shared/activity/activity";

@Pipe({
  name: "i18n"
})
export class I18nPipe implements PipeTransform {
  transform(value: Description): string {
    let i18n = ApplicationSettings.getString("i18n");
    if (value[i18n]) {
      return value[i18n];
    }
    if (value.en) {
      return value.en;
    }
    return "No description";
  }
}
