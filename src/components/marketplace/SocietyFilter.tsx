
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocietyFilterProps {
  societies: string[];
  activeSociety: string;
  onSocietyChange: (society: string) => void;
}

const SocietyFilter: React.FC<SocietyFilterProps> = ({
  societies,
  activeSociety,
  onSocietyChange,
}) => {
  return (
    <div className="mb-8 overflow-x-auto scrollbar-hide">
      <div className="flex space-x-2 pb-2">
        {societies.map((society) => (
          <Button
            key={society}
            variant={society === activeSociety ? "default" : "outline"}
            className={cn(
              "whitespace-nowrap",
              society === activeSociety 
                ? "bg-marketplace-blue text-white" 
                : "text-marketplace-gray-700"
            )}
            onClick={() => onSocietyChange(society)}
          >
            {society}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocietyFilter;
