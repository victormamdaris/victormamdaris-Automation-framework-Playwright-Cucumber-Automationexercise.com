export interface UserData {
  name: string;
  email: string;
  password: string;
  title?: 'Mr' | 'Mrs';
  dateOfBirth?: {
    day: string;
    month: string;
    year: string;
  };
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  mobileNumber?: string;
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  price: string;
  brand?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
