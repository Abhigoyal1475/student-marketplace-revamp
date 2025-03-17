
import React from "react";
import { cn } from "@/lib/utils";
import { Building } from "lucide-react";
import { HOUSING_SOCIETIES } from "@/data/mockData";

interface SocietyFilterProps {
  selectedSociety: string;
  onChange: (society: string) => void;
  className?: string;
}

const SocietyFilter: React.FC<SocietyFilterProps> = ({
  selectedSociety,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <h4 className="font-medium mb-3">Society</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {HOUSING_SOCIETIES.map((soc) => (
          <button
            key={soc}
            className={cn(
              "flex items-center w-full gap-2 px-3 py-2 rounded-lg text-left transition-colors",
              soc === selectedSociety
                ? "bg-marketplace-blue-light text-marketplace-blue"
                : "text-marketplace-gray-700 hover:bg-marketplace-gray-50"
            )}
            onClick={() => onChange(soc)}
          >
            <Building className="h-4 w-4" />
            <span>{soc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocietyFilter;
