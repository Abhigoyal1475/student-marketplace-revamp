
import React from "react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS, getSortLabel } from "./FilterConstants";
import { SortOption } from "@/types/filters";

interface SortFilterProps {
  selectedSort: SortOption;
  onChange: (sort: SortOption) => void;
  className?: string;
}

const SortFilter: React.FC<SortFilterProps> = ({
  selectedSort,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <h4 className="font-medium mb-3">Sort By</h4>
      <div className="space-y-2">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg transition-colors",
              option === selectedSort
                ? "bg-marketplace-blue-light text-marketplace-blue"
                : "text-marketplace-gray-700 hover:bg-marketplace-gray-50"
            )}
            onClick={() => onChange(option as SortOption)}
          >
            {getSortLabel(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortFilter;
