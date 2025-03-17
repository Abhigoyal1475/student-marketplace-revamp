import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Container from "@/components/ui/container";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/marketplace/Hero";
import SearchBar from "@/components/marketplace/SearchBar";
import Filters, { CategoryOption, SortOption } from "@/components/marketplace/Filters";
import ProductGrid from "@/components/marketplace/ProductGrid";
import FeaturedListings from "@/components/marketplace/FeaturedListings";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// List of housing societies
export const HOUSING_SOCIETIES = [
  "All Societies",
  "Stratford",
  "Scotland",
  "Holly Hall",
  "Windsor Hill",
  "Cambridge Commons",
  "College Suites",
  "University Village",
  "Campus Edge"
];

// Mock data for demo
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "IKEA Study Desk - Great Condition",
    price: 50,
    location: "Near UH Campus",
    thumbnail: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Perfect desk for studying, in excellent condition. Spacious surface and sturdy build. Moving out so need to sell quickly!",
    condition: "Like New",
    category: "Furniture",
    createdAt: "2023-08-15T12:00:00Z",
    sellerName: "Alex",
    isVerified: true,
    society: "Stratford"
  },
  {
    id: "2",
    title: "Calculus Textbook - 8th Edition",
    price: 25,
    location: "Downtown",
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Calculus textbook in good condition, with minor highlighting. All pages intact.",
    condition: "Used",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-14T10:30:00Z",
    sellerName: "Maria",
    society: "Scotland"
  },
  {
    id: "3",
    title: "Mountain Bike - Trek",
    price: 120,
    location: "West Campus",
    thumbnail: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Trek mountain bike with 21 gears, recently serviced. Great for getting around campus and weekend rides.",
    condition: "Used",
    category: "Bicycles & Transport",
    createdAt: "2023-08-13T15:45:00Z",
    sellerName: "John",
    isVerified: true,
    society: "Holly Hall"
  },
  {
    id: "4",
    title: "MacBook Air M1 2020",
    price: 600,
    location: "University Area",
    thumbnail: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Battery health at 92%, comes with charger and case.",
    condition: "Like New",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-12T09:20:00Z",
    sellerName: "Emma",
    isVerified: true,
    society: "Windsor Hill"
  },
  {
    id: "5",
    title: "Mini Refrigerator",
    price: 70,
    location: "Residential Halls",
    thumbnail: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Compact refrigerator, perfect for dorm rooms. 3.2 cubic feet with freezer compartment.",
    condition: "Used",
    category: "Home Essentials",
    createdAt: "2023-08-11T14:15:00Z",
    sellerName: "David",
    society: "Cambridge Commons"
  },
  {
    id: "6",
    title: "Electric Scooter",
    price: 200,
    location: "Near Medical Center",
    thumbnail: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Electric scooter with 25 mile range, perfect for commuting to campus. Foldable and lightweight.",
    condition: "Like New",
    category: "Bicycles & Transport",
    createdAt: "2023-08-09T16:40:00Z",
    sellerName: "James",
    society: "College Suites"
  },
  {
    id: "7",
    title: "Desk Lamp with Wireless Charger",
    price: 30,
    location: "Student Housing",
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Modern desk lamp with adjustable brightness and built-in wireless charger. USB port included.",
    condition: "New",
    category: "Home Essentials",
    createdAt: "2023-08-08T13:50:00Z",
    sellerName: "Olivia",
    society: "University Village"
  },
  {
    id: "8",
    title: "Ergonomic Office Chair",
    price: 85,
    location: "South Campus",
    thumbnail: "https://images.unsplash.com/photo-1541558869434-2f86637b9d33?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Comfortable office chair with lumbar support and adjustable height. Great for long study sessions.",
    condition: "Used",
    category: "Furniture",
    createdAt: "2023-08-07T10:15:00Z",
    sellerName: "Daniel",
    society: "Campus Edge"
  },
  {
    id: "9",
    title: "Scientific Calculator - TI-84",
    price: 40,
    location: "Math Department",
    thumbnail: "https://images.unsplash.com/photo-1564815334653-3b8b33635e2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "TI-84 Plus graphing calculator, perfect for math, engineering, and science courses.",
    condition: "Used",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-06T09:10:00Z",
    sellerName: "Ava",
    society: "Stratford"
  },
  {
    id: "10",
    title: "Microwave - Compact Size",
    isFree: true,
    price: 0,
    location: "Near Library",
    thumbnail: "https://images.unsplash.com/photo-1585240947397-ee649adab6c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Small microwave in working condition. Moving out and need it gone ASAP - free to whoever needs it!",
    condition: "Used",
    category: "Home Essentials",
    createdAt: "2023-08-05T14:30:00Z",
    sellerName: "Noah",
    society: "Scotland"
  },
  {
    id: "11",
    title: "Drawing Tablet - Wacom",
    price: 70,
    location: "Art Department",
    thumbnail: "https://images.unsplash.com/photo-1561225360-05df2db7c44a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Wacom drawing tablet, barely used. Perfect for digital art and design courses.",
    condition: "Like New",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-04T11:45:00Z",
    sellerName: "Isabella",
    isVerified: true,
    society: "Holly Hall"
  },
  {
    id: "12",
    title: "Blue Mechanical Keyboard",
    price: 45,
    sold: true,
    location: "Campus Center",
    thumbnail: "https://images.unsplash.com/photo-1595044426096-d7e1c8d8efe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Cherry MX Blue mechanical keyboard. Excellent for typing papers and light gaming.",
    condition: "Used",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-03T16:20:00Z",
    sellerName: "Alex",
    isVerified: true,
    society: "Windsor Hill"
  },
];

// Search suggestions
const SEARCH_SUGGESTIONS = [
  "Desk", "Chair", "Bike", "Laptop", "Bicycle", 
  "Microwave", "Refrigerator", "Calculator", "Bookshelf",
  "Monitor", "Keyboard", "Bed Frame", "Mattress"
];

const Index = () => {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Filter state
  const [activeFilters, setActiveFilters] = useState({
    sort: "newest" as SortOption,
    category: "all" as CategoryOption,
    priceRange: [0, 1000] as [number, number],
    society: "All Societies"
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...MOCK_PRODUCTS];
    
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
  }, [searchQuery, activeFilters]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (filters: {
    sort: SortOption;
    category: CategoryOption;
    priceRange: [number, number];
    society?: string;
  }) => {
    setActiveFilters({
      ...activeFilters,
      ...filters,
      society: filters.society || activeFilters.society
    });
  };

  // Handle society change
  const handleSocietyChange = (society: string) => {
    setActiveFilters({
      ...activeFilters,
      society
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
          
          {/* Society Filter */}
          <div className="mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2">
              {HOUSING_SOCIETIES.map((society) => (
                <Button
                  key={society}
                  variant={society === activeFilters.society ? "default" : "outline"}
                  className={cn(
                    "whitespace-nowrap",
                    society === activeFilters.society 
                      ? "bg-marketplace-blue text-white" 
                      : "text-marketplace-gray-700"
                  )}
                  onClick={() => handleSocietyChange(society)}
                >
                  {society}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Filters - Desktop */}
            {!isMobile && (
              <aside className="hidden lg:block sticky top-24 h-fit">
                <Filters onFilterChange={handleFilterChange} />
              </aside>
            )}
            
            <div className="space-y-10">
              {/* Filters - Mobile */}
              {isMobile && (
                <Filters 
                  isMobile={true} 
                  onFilterChange={handleFilterChange} 
                />
              )}
              
              {/* Featured Listings - now showing 6 */}
              <FeaturedListings products={MOCK_PRODUCTS.slice(0, 6)} />
              
              {/* Product Grid */}
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {searchQuery 
                    ? `Search Results for "${searchQuery}"`
                    : activeFilters.society !== "All Societies"
                    ? `Items in ${activeFilters.society}`
                    : activeFilters.category !== "all"
                    ? `${activeFilters.category.charAt(0).toUpperCase() + activeFilters.category.slice(1)} Items`
                    : "Browse All Items"
                  }
                </h2>
                <ProductGrid products={filteredProducts} loading={isLoading} />
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          className="fixed bottom-6 right-6 p-3 rounded-full bg-marketplace-blue text-white shadow-lg hover:bg-marketplace-blue-dark transition-colors z-40 animate-fade-in"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Index;
