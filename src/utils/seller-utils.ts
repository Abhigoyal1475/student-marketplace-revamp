
import { Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/data/mockData";

export interface SellerData {
  id: string;
  name: string;
  username: string;
  bio: string;
  memberSince: string;
  location: string;
  email: string;
  phone: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  profileImage: string;
}

// Mock seller data - in a real app, this would be fetched from an API
export const getMockSellerData = (sellerId: string): SellerData => {
  return {
    id: sellerId,
    name: "Alex Johnson",
    username: "alex_j",
    bio: "Graduate student selling items I no longer need. All items are in good condition and prices are negotiable.",
    memberSince: "January 2023",
    location: "Stratford Apartments",
    email: "alex@example.edu",
    phone: "+1 (555) 123-4567",
    verified: true,
    rating: 4.8,
    reviewCount: 27,
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  };
};

// Filter products by seller name (not ID)
export const getSellerProducts = (sellerName: string): Product[] => {
  return MOCK_PRODUCTS.filter(
    (product) => product.sellerName === sellerName
  );
};
