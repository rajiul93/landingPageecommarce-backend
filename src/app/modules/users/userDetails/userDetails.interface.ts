export interface IUserDetails {
  userId: string; // reference to User
  phone?: string;
  profileImage?: string;
  addresses?: {
    label?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }[];
  wishlist?: string[]; // product IDs
  cart?: {
    productId: string;
    quantity: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
