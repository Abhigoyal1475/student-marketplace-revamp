
import React from "react";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
  className?: string;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRange,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <h4 className="font-medium mb-3">Price Range</h4>
      <div className="px-2">
        <Slider
          value={priceRange}
          min={0}
          max={1000}
          step={10}
          onValueChange={(value) => onChange([value[0], value[1]])}
        />
        <div className="flex justify-between mt-2 text-sm text-marketplace-gray-500">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
