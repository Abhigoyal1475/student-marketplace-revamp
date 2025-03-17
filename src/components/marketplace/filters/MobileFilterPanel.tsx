
import React from "react";
import { X, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { HOUSING_SOCIETIES } from "@/data/mockData";
import { CATEGORY_OPTIONS, getCategoryLabel, getCategoryIcon } from "./FilterConstants";
import { SORT_OPTIONS, getSortLabel } from "./FilterConstants";
import { FilterState, SortOption, CategoryOption } from "@/types/filters";

interface MobileFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdateFilters: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

const MobileFilterPanel: React.FC<MobileFilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 animate-fade-in overflow-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const Icon = getCategoryIcon(cat);
                return (
                  <button
                    key={cat}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border text-left",
                      cat === filters.category
                        ? "border-marketplace-blue bg-marketplace-blue-light text-marketplace-blue"
                        : "border-marketplace-gray-200 text-marketplace-gray-700"
                    )}
                    onClick={() => 
                      onUpdateFilters({ category: cat as CategoryOption })
                    }
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{getCategoryLabel(cat)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Society</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {HOUSING_SOCIETIES.map((soc) => (
                <button
                  key={soc}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 rounded-lg border text-left",
                    soc === filters.society
                      ? "border-marketplace-blue bg-marketplace-blue-light text-marketplace-blue"
                      : "border-marketplace-gray-200 text-marketplace-gray-700"
                  )}
                  onClick={() => onUpdateFilters({ society: soc })}
                >
                  <Building className="h-4 w-4" />
                  <span>{soc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) =>
                  onUpdateFilters({
                    priceRange: [value[0], value[1]],
                  })
                }
              />
              <div className="flex justify-between mt-2 text-sm text-marketplace-gray-500">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Sort By</h4>
            <div className="space-y-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg border",
                    option === filters.sort
                      ? "border-marketplace-blue bg-marketplace-blue-light text-marketplace-blue"
                      : "border-marketplace-gray-200 text-marketplace-gray-700"
                  )}
                  onClick={() =>
                    onUpdateFilters({ sort: option as SortOption })
                  }
                >
                  {getSortLabel(option)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onResetFilters}
          >
            Reset Filters
          </Button>
          <Button
            className="flex-1 bg-marketplace-blue"
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterPanel;
