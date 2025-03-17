
import React from "react";
import { cn } from "@/lib/utils";
import { CATEGORY_OPTIONS, getCategoryLabel, getCategoryIcon } from "./FilterConstants";
import { CategoryOption } from "@/types/filters";

interface CategoryFilterProps {
  selectedCategory: CategoryOption;
  onChange: (category: CategoryOption) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <h4 className="font-medium mb-3">Categories</h4>
      <div className="space-y-2">
        {CATEGORY_OPTIONS.map((cat) => {
          const Icon = getCategoryIcon(cat);
          return (
            <button
              key={cat}
              className={cn(
                "flex items-center w-full gap-2 px-3 py-2 rounded-lg text-left transition-colors",
                cat === selectedCategory
                  ? "bg-marketplace-blue-light text-marketplace-blue"
                  : "text-marketplace-gray-700 hover:bg-marketplace-gray-50"
              )}
              onClick={() => onChange(cat as CategoryOption)}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{getCategoryLabel(cat)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
