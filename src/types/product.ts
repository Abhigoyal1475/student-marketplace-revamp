
export interface Product {
  id: string;
  title: string;
  price: number;
  isFree?: boolean;
  location: string;
  thumbnail: string;
  description: string;
  condition: "New" | "Like New" | "Used";
  category: string;
  createdAt: string;
  sellerName: string;
  isVerified?: boolean;
  sold?: boolean;
  society?: string;
}
