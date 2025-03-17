
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Filters from "@/components/marketplace/Filters";
import FeaturedListings from "@/components/marketplace/FeaturedListings";
import ProductGrid from "@/components/marketplace/ProductGrid";
import SearchResultsHeading from "@/components/marketplace/SearchResultsHeading";
import { Product } from "@/types/product";
import { FilterState } from "@/types/filters";

interface MarketplaceContentProps {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  searchQuery: string;
  activeFilters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const MarketplaceContent: React.FC<MarketplaceContentProps> = ({
  products,
  filteredProducts,
  isLoading,
  searchQuery,
  activeFilters,
  onFilterChange,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:gap-8">
      {/* Filters - Desktop */}
      {!isMobile && (
        <aside className="hidden lg:block sticky top-24 self-start">
          <Filters onFilterChange={onFilterChange} />
        </aside>
      )}
      
      <div className="space-y-6 lg:space-y-10">
        {/* Filters - Mobile */}
        {isMobile && (
          <Filters 
            isMobile={true} 
            onFilterChange={onFilterChange} 
          />
        )}
        
        {/* Featured Listings - showing 4 on mobile, 6 on desktop */}
        <FeaturedListings products={products.slice(0, isMobile ? 4 : 6)} />
        
        {/* Product Grid */}
        <div>
          <SearchResultsHeading 
            searchQuery={searchQuery} 
            society={activeFilters.society}
            category={activeFilters.category}
          />
          <ProductGrid products={filteredProducts} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceContent;
