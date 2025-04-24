export interface Address {
  id: string;

  building: string;
  street: string;
  landmark: string;
  pincode: string;
  state: string;
  country: string;
  default?: boolean;
}
