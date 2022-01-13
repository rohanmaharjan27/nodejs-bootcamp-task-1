export interface Book {
  name: string;
  author: string;
  image?: string;
}

export interface Rent {
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  phone: string;
  rent_date: Date;
  return_date: Date;
  return_date_max: Date;
}
