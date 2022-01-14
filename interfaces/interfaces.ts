export interface Book {
  name: string;
  author: string;
  image?: string;
  slug: String;
}

export interface Record {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  rent_date: Date;
  return_date: Date;
  return_date_max: Date;
}
