
export type SortOption = "newest" | "price_low" | "price_high" | "closest";
export type CategoryOption = "all" | "furniture" | "books" | "transport" | "home" | "electronics";

export interface FilterState {
  sort: SortOption;
  category: CategoryOption;
  priceRange: [number, number];
  society: string;
}
