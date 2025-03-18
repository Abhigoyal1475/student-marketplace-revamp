
import React, { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/marketplace/Hero";
import SearchBar from "@/components/marketplace/SearchBar";
import MarketplaceContent from "@/components/marketplace/MarketplaceContent";
import SocietyFilter from "@/components/marketplace/SocietyFilter";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { useProductFilters } from "@/hooks/use-product-filters";
import { MOCK_PRODUCTS, HOUSING_SOCIETIES, SEARCH_SUGGESTIONS } from "@/data/mockData";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the filter hook
  const {
    filteredProducts,
    searchQuery,
    activeFilters,
    handleSearch,
    handleFilterChange,
    handleSocietyChange
  } = useProductFilters({ products: MOCK_PRODUCTS });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-marketplace-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="mb-8 max-w-3xl mx-auto">
            <SearchBar 
              onSearch={handleSearch} 
              autoSuggestions={SEARCH_SUGGESTIONS}
            />
          </div>
          
          {/* Society Filter - only show when not searching */}
          {!searchQuery && (
            <SocietyFilter
              societies={HOUSING_SOCIETIES}
              activeSociety={activeFilters.society}
              onSocietyChange={handleSocietyChange}
            />
          )}
          
          <MarketplaceContent
            products={MOCK_PRODUCTS}
            filteredProducts={filteredProducts}
            isLoading={isLoading}
            searchQuery={searchQuery}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </Container>
      </section>
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
