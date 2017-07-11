export class Activity {
  latitude: number;
  longitude: number;
  date_created: string;
  date_modified: string;
  date_published: string;
  image: string;
  availability: Availability;
  price: Price;
  description: Description;
  type: string;
  duration: string;
  owner: Owner;
  place: string;
  title: Description;

  // To be removed for v0.0.2
  @Deprecated
  static getText(activity: Activity): string {
    return activity.description.en || "no description";
  }

  static getI18n(activity: Activity, key: string, lang: string): string {
    if (!activity) {
      throw Error("activity not found.");
    }
    if (!activity[key]) {
      throw Error("key " + key + " for activity was not found.");
    }
    if (activity[key][lang]) {
      return activity[key][lang];
    }
    if (activity[key]["en"]) {
      return activity[key]["en"];
    }
    throw Error("Neither " + lang + " nor default en have beend found for activity.");
  }
}

export class Availability {
  start: Date;
  end: Date;
  time: Period[];
}

export class Period {
  start: number;
  end: number;
}

export class Price {
  currency: string;
  amount: number;

  static toString(price: Price): string {
    return price.amount + " " + price.currency.toUpperCase();
  }
}

export class Description {
  en: string;
  fr: string;
  si: string;
}

export class Owner {
  name: string;
  country: string;
  languages: string[];
  avatar: string;
  contact: Contact;
}

export class Contact {
  phone: string;
  email: string;
}
