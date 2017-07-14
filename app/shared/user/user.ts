import { Serializable } from "../serializable";

var validator = require("email-validator");

export class User implements Serializable<User> {
  name: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  languages: string[];
  dob: number;
  i18n: string;
  currency: string;
  avatar: string;
  owner: boolean;

  isValidEmail() {
    return validator.validate(this.email);
  }

  deserialize(input) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password || "";
    this.phone = input.phone;
    this.country = input.country;
    this.languages = [];
    if (input.languages) {
      input.languages.forEach(entity => {
        this.languages.push(entity);
      });
    }
    this.dob = input.dob;
    this.i18n = input.i18n;
    this.currency = input.currency;
    this.avatar = input.avatar;
    this.owner = input.isOwner;
    return this;
  }
}
