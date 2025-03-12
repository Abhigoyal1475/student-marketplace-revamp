
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Sofa, 
  BookOpen, 
  Bike, 
  Home, 
  Smartphone, 
  ChevronDown, 
  Filter as FilterIcon, 
  X
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Filter types
export type SortOption = "newest" | "price_low" | "price_high" | "closest";
export type CategoryOption = "all" | "furniture" | "books" | "transport" | "home" | "electronics";

interface FiltersProps {
  className?: string;
  onFilterChange?: (filters: {
    sort: SortOption;
    category: CategoryOption;
    priceRange: [number, number];
    location?: string;
  }) => void;
  isMobile?: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  className,
  onFilterChange,
  isMobile = false,
}) => {
  // Default price range from $0 to $1000
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sort, setSort] = useState<SortOption>("newest");
  const [category, setCategory] = useState<CategoryOption>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Update filters and notify parent component
  const updateFilters = ({
    newSort = sort,
    newCategory = category,
    newPriceRange = priceRange,
  }: {
    newSort?: SortOption;
    newCategory?: CategoryOption;
    newPriceRange?: [number, number];
  }) => {
    setSort(newSort);
    setCategory(newCategory);
    setPriceRange(newPriceRange);

    // Build active filters array for badges
    const filters: string[] = [];
    if (newCategory !== "all") filters.push(getCategoryLabel(newCategory));
    if (newSort !== "newest") filters.push(getSortLabel(newSort));
    if (newPriceRange[0] > 0 || newPriceRange[1] < 1000) {
      filters.push(`$${newPriceRange[0]} - $${newPriceRange[1]}`);
    }
    setActiveFilters(filters);

    // Notify parent component
    if (onFilterChange) {
      onFilterChange({
        sort: newSort,
        category: newCategory,
        priceRange: newPriceRange,
      });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    updateFilters({
      newSort: "newest",
      newCategory: "all",
      newPriceRange: [0, 1000],
    });
  };

  // Get human-readable category label
  const getCategoryLabel = (cat: CategoryOption): string => {
    const labels = {
      all: "All Categories",
      furniture: "Furniture",
      books: "Books & Study Materials",
      transport: "Bicycles & Transport",
      home: "Home Essentials",
      electronics: "Electronics & Gadgets",
    };
    return labels[cat];
  };

  // Get human-readable sort label
  const getSortLabel = (sortOption: SortOption): string => {
    const labels = {
      newest: "Newest First",
      price_low: "Price: Low to High",
      price_high: "Price: High to Low",
      closest: "Closest Location",
    };
    return labels[sortOption];
  };

  // Get icon for category
  const getCategoryIcon = (cat: CategoryOption) => {
    switch (cat) {
      case "furniture":
        return <Sofa className="h-4 w-4" />;
      case "books":
        return <BookOpen className="h-4 w-4" />;
      case "transport":
        return <Bike className="h-4 w-4" />;
      case "home":
        return <Home className="h-4 w-4" />;
      case "electronics":
        return <Smartphone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Mobile filter sheet
  if (isMobile) {
    return (
      <div className={cn("w-full", className)}>
        {/* Mobile filter trigger */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FilterIcon className="h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
          
          {/* Sort dropdown for mobile */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Sort <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <div className="flex flex-col">
                {["newest", "price_low", "price_high", "closest"].map(
                  (option) => (
                    <button
                      key={option}
                      className={cn(
                        "text-left px-4 py-2 hover:bg-marketplace-gray-50 transition-colors",
                        option === sort
                          ? "text-marketplace-blue font-medium"
                          : "text-marketplace-gray-700"
                      )}
                      onClick={() => updateFilters({ newSort: option as SortOption })}
                    >
                      {getSortLabel(option as SortOption)}
                    </button>
                  )
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={resetFilters} />
              </Badge>
            ))}
          </div>
        )}

        {/* Mobile filter panel */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-white z-50 animate-fade-in overflow-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["all", "furniture", "books", "transport", "home", "electronics"].map(
                      (cat) => (
                        <button
                          key={cat}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg border text-left",
                            cat === category
                              ? "border-marketplace-blue bg-marketplace-blue-light text-marketplace-blue"
                              : "border-marketplace-gray-200 text-marketplace-gray-700"
                          )}
                          onClick={() =>
                            updateFilters({ newCategory: cat as CategoryOption })
                          }
                        >
                          {getCategoryIcon(cat as CategoryOption)}
                          <span>{getCategoryLabel(cat as CategoryOption)}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={(value) =>
                        updateFilters({
                          newPriceRange: [value[0], value[1]],
                        })
                      }
                    />
                    <div className="flex justify-between mt-2 text-sm text-marketplace-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Sort By</h4>
                  <div className="space-y-2">
                    {["newest", "price_low", "price_high", "closest"].map(
                      (option) => (
                        <button
                          key={option}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg border",
                            option === sort
                              ? "border-marketplace-blue bg-marketplace-blue-light text-marketplace-blue"
                              : "border-marketplace-gray-200 text-marketplace-gray-700"
                          )}
                          onClick={() =>
                            updateFilters({ newSort: option as SortOption })
                          }
                        >
                          {getSortLabel(option as SortOption)}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
                <Button
                  className="flex-1 bg-marketplace-blue"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop filters
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-5", className)}>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {["all", "furniture", "books", "transport", "home", "electronics"].map(
              (cat) => (
                <button
                  key={cat}
                  className={cn(
                    "flex items-center w-full gap-2 px-3 py-2 rounded-lg text-left transition-colors",
                    cat === category
                      ? "bg-marketplace-blue-light text-marketplace-blue"
                      : "text-marketplace-gray-700 hover:bg-marketplace-gray-50"
                  )}
                  onClick={() =>
                    updateFilters({ newCategory: cat as CategoryOption })
                  }
                >
                  {getCategoryIcon(cat as CategoryOption)}
                  <span>{getCategoryLabel(cat as CategoryOption)}</span>
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={(value) =>
                updateFilters({
                  newPriceRange: [value[0], value[1]],
                })
              }
            />
            <div className="flex justify-between mt-2 text-sm text-marketplace-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Sort By</h4>
          <div className="space-y-2">
            {["newest", "price_low", "price_high", "closest"].map(
              (option) => (
                <button
                  key={option}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors",
                    option === sort
                      ? "bg-marketplace-blue-light text-marketplace-blue"
                      : "text-marketplace-gray-700 hover:bg-marketplace-gray-50"
                  )}
                  onClick={() =>
                    updateFilters({ newSort: option as SortOption })
                  }
                >
                  {getSortLabel(option as SortOption)}
                </button>
              )
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
