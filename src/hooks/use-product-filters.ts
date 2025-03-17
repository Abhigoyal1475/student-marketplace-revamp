
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { FilterState, SortOption, CategoryOption } from "@/types/filters";

interface UseProductFiltersProps {
  products: Product[];
  initialFilters?: Partial<FilterState>;
}

export const useProductFilters = ({ 
  products, 
  initialFilters 
}: UseProductFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    sort: initialFilters?.sort || "newest",
    category: initialFilters?.category || "all",
    priceRange: initialFilters?.priceRange || [0, 1000],
    society: initialFilters?.society || "All Societies"
  });

  // Apply filters whenever search query or active filters change
  useEffect(() => {
    let filtered = [...products];
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilters.category !== "all") {
      filtered = filtered.filter((product) => {
        const categoryMap: Record<CategoryOption, string> = {
          furniture: "Furniture",
          books: "Books & Study Materials",
          transport: "Bicycles & Transport",
          home: "Home Essentials",
          electronics: "Electronics & Gadgets",
          all: "",
        };
        
        return product.category === categoryMap[activeFilters.category];
      });
    }
    
    // Apply society filter
    if (activeFilters.society !== "All Societies") {
      filtered = filtered.filter(
        (product) => product.society === activeFilters.society
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= activeFilters.priceRange[0] &&
        product.price <= activeFilters.priceRange[1]
    );
    
    // Apply sorting
    switch (activeFilters.sort) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "closest":
        // In a real app, you would calculate actual distance
        // For demo purposes, we'll just do a simple alphabetical sort by location
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, activeFilters, products]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (filters: Partial<FilterState>) => {
    setActiveFilters({
      ...activeFilters,
      ...filters,
    });
  };

  // Handle society change
  const handleSocietyChange = (society: string) => {
    setActiveFilters({
      ...activeFilters,
      society
    });
  };

  return {
    filteredProducts,
    searchQuery,
    activeFilters,
    handleSearch,
    handleFilterChange,
    handleSocietyChange
  };
};
