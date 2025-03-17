
import React from "react";
import { FilterIcon, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SortOption, FilterState } from "@/types/filters";
import { getSortLabel } from "./FilterConstants";

interface MobileFilterBarProps {
  activeFilters: string[];
  sort: SortOption;
  onToggleFilters: () => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
}

const MobileFilterBar: React.FC<MobileFilterBarProps> = ({
  activeFilters,
  sort,
  onToggleFilters,
  onSortChange,
  onResetFilters,
}) => {
  return (
    <>
      {/* Mobile filter trigger */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onToggleFilters}
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
                    onClick={() => onSortChange(option as SortOption)}
                  >
                    {getSortLabel(option)}
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
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={onResetFilters} />
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileFilterBar;
