
import { 
  Sofa, 
  BookOpen, 
  Bike, 
  Home, 
  Smartphone,
  Building
} from "lucide-react";

// Category options and labels
export const CATEGORY_OPTIONS = ["all", "furniture", "books", "transport", "home", "electronics"] as const;

export const getCategoryLabel = (cat: string): string => {
  const labels: Record<string, string> = {
    all: "All Categories",
    furniture: "Furniture",
    books: "Books & Study Materials",
    transport: "Bicycles & Transport",
    home: "Home Essentials",
    electronics: "Electronics & Gadgets",
  };
  return labels[cat] || cat;
};

// Category icons
export const getCategoryIcon = (cat: string) => {
  switch (cat) {
    case "furniture":
      return Sofa;
    case "books":
      return BookOpen;
    case "transport":
      return Bike;
    case "home":
      return Home;
    case "electronics":
      return Smartphone;
    default:
      return null;
  }
};

// Sort options and labels
export const SORT_OPTIONS = ["newest", "price_low", "price_high", "closest"] as const;

export const getSortLabel = (sortOption: string): string => {
  const labels: Record<string, string> = {
    newest: "Newest First",
    price_low: "Price: Low to High",
    price_high: "Price: High to Low",
    closest: "Closest Location",
  };
  return labels[sortOption] || sortOption;
};
