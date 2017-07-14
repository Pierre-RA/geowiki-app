import { Pipe, PipeTransform } from "@angular/core";
import * as ApplicationSettings from "application-settings";

import { isValidNumber, parse, format } from 'libphonenumber-js';

@Pipe({
  name: "phoneNumber"
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phone: string): string {
    let result;
    let phonenumber;

    if (!isValidNumber(phone)) {
      result = "invalid phone number";
    }

    phonenumber = parse(phone);
    result = format(phonenumber, 'International');
    
    return result;
  }
}
