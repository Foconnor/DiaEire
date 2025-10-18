export interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  price: string;
  discountPrice: string;
  stock: string;
  description: string;
}

export interface Order {
  id:string;
  country: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  orderNotes: string;
  phone: string;
  postcode: string;
  productsIds: string[];
  paymentStatus: string;
  streetAddress: string;
  townCity: string;
  status:string;
}
