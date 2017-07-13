import { Serializable } from "../serializable";
import { User } from "../user/user";

export class Activity implements Serializable<Activity> {
  latitude: number;
  longitude: number;
  date_created: Date;
  date_modified: Date;
  date_published: Date;
  image: string;
  availability: Availability;
  price: Price;
  description: Description;
  type: string;
  duration: number;
  owner: User;
  place: string;
  title: Description;

  getI18n(key: string, lang: string): string {
    if (!this[key]) {
      throw Error("key " + key + " for activity was not found.");
    }
    if (this[key][lang]) {
      return this[key][lang];
    }
    if (this[key]["en"]) {
      return this[key]["en"];
    }
    throw Error("Neither " + lang + " nor default en have beend found for activity.");
  }

  deserialize(input) {
    try {
      this.latitude = input.latitude;
      this.longitude = input.longitude;
      this.date_created = new Date(input.date_created);
      this.date_modified = new Date(input.date_modified);
      this.date_published = new Date(input.date_published);
      this.image = input.image;
      this.availability = new Availability().deserialize(input.availability);
      this.price = new Price().deserialize(input.price);
      this.description = new Description().deserialize(input.description);
      this.type = input.type;
      this.duration = input.duration;
      this.owner = new User().deserialize(input.owner);
      this.place = input.place;
      this.title = new Description().deserialize(input.description);
    } catch(err) {
      throw new Error('error at activity ' + err);
    }

    return this;
  }
}

export class Availability implements Serializable<Availability> {
  start: Date;
  end: Date;
  time: Period[];

  deserialize(input) {
    try {
      this.start = new Date(input.start);
      this.end = new Date(input.end);
      this.time = [];
      input.time.forEach(entity => {
        this.time.push(new Period().deserialize(entity));
      });
    } catch(err) {
      throw new Error('Error at Availability. ' + err);
    }

    return this;
  }
}

export class Period implements Serializable<Period> {
  start: number;
  end: number;

  deserialize(input) {
    this.start = input.start || 0;
    this.end = input.end || 0;
    return this;
  }
}

export class Price implements Serializable<Price> {
  currency: string;
  amount: number;

  public toString = () : string => {
    return this.amount + " " + this.currency.toUpperCase();
  }

  deserialize(input) {
    this.currency = input.currency || "";
    this.amount = input.amount || "";
    return this;
  }
}

export class Description implements Serializable<Description> {
  en: string;
  fr: string;
  si: string;

  deserialize(input) {
    this.en = input.en || "No description";
    this.fr = input.fr || "Aucune description";
    this.si = input.si || "විස්තරයක් නෑ";
    return this;
  }
}
