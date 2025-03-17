
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterState, SortOption, CategoryOption } from "@/types/filters";
import { getCategoryLabel, getSortLabel } from "./filters/FilterConstants";
import CategoryFilter from "./filters/CategoryFilter";
import SocietyFilter from "./filters/SocietyFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import SortFilter from "./filters/SortFilter";
import MobileFilterBar from "./filters/MobileFilterBar";
import MobileFilterPanel from "./filters/MobileFilterPanel";

interface FiltersProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
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
  const [society, setSociety] = useState("All Societies");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Update filters and notify parent component
  const updateFilters = ({
    newSort = sort,
    newCategory = category,
    newPriceRange = priceRange,
    newSociety = society,
  }: {
    newSort?: SortOption;
    newCategory?: CategoryOption;
    newPriceRange?: [number, number];
    newSociety?: string;
  }) => {
    setSort(newSort);
    setCategory(newCategory);
    setPriceRange(newPriceRange);
    setSociety(newSociety);

    // Build active filters array for badges
    const filters: string[] = [];
    if (newCategory !== "all") filters.push(getCategoryLabel(newCategory));
    if (newSort !== "newest") filters.push(getSortLabel(newSort));
    if (newSociety !== "All Societies") filters.push(newSociety);
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
        society: newSociety,
      });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    updateFilters({
      newSort: "newest",
      newCategory: "all",
      newPriceRange: [0, 1000],
      newSociety: "All Societies",
    });
  };

  // Handle partial filter updates
  const handleFilterUpdate = (partialFilters: Partial<FilterState>) => {
    updateFilters({
      newSort: partialFilters.sort || sort,
      newCategory: partialFilters.category || category,
      newPriceRange: partialFilters.priceRange || priceRange,
      newSociety: partialFilters.society || society,
    });
  };

  // Mobile filter components
  if (isMobile) {
    return (
      <div className={cn("w-full", className)}>
        <MobileFilterBar 
          activeFilters={activeFilters}
          sort={sort}
          onToggleFilters={() => setIsFilterOpen(!isFilterOpen)}
          onSortChange={(newSort) => updateFilters({ newSort })}
          onResetFilters={resetFilters}
        />
        
        <MobileFilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={{ sort, category, priceRange, society }}
          onUpdateFilters={handleFilterUpdate}
          onResetFilters={resetFilters}
        />
      </div>
    );
  }

  // Desktop filters
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-5 h-[calc(100vh-120px)] flex flex-col", className)}>
      <div className="overflow-hidden flex-1">
        <ScrollArea className="h-full pr-2">
          <div className="space-y-6">
            <CategoryFilter 
              selectedCategory={category} 
              onChange={(newCategory) => updateFilters({ newCategory })} 
            />

            <SocietyFilter 
              selectedSociety={society} 
              onChange={(newSociety) => updateFilters({ newSociety })} 
            />

            <PriceRangeFilter 
              priceRange={priceRange} 
              onChange={(newPriceRange) => updateFilters({ newPriceRange })} 
            />

            <SortFilter 
              selectedSort={sort} 
              onChange={(newSort) => updateFilters({ newSort })} 
            />
          </div>
        </ScrollArea>
      </div>
      <div className="mt-4 pt-4 border-t">
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
