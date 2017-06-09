export class Activity {
  latitdue: string;
  longitude: string;
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
