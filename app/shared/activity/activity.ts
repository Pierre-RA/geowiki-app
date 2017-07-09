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

  static getText(activity: Activity): string {
    return activity.description.en || "no description";
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
    return price.amount + " " + price.currency;
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
  contact: Contact;
}

export class Contact {
  phone: string;
  email: string;
}
