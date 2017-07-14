import { Pipe, PipeTransform } from "@angular/core";
import * as ApplicationSettings from "application-settings";

import { countries } from "typed-countries";

@Pipe({
  name: "countries"
})
export class CountriesPipe implements PipeTransform {
  transform(country: string): string {
    let tmp = countries.find(c => c.iso == country.toUpperCase());
    return tmp.name;
  }
}
