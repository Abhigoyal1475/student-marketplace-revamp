
import React from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeaturedBadgeProps {
  show: boolean;
}

export const FeaturedBadge: React.FC<FeaturedBadgeProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="absolute top-3 left-3 z-10">
      <Badge className="bg-marketplace-blue text-white px-2 py-1">
        <Star className="h-3 w-3 mr-1 fill-white" />
        Featured
      </Badge>
    </div>
  );
};

interface FreeBadgeProps {
  isFree?: boolean;
}

export const FreeBadge: React.FC<FreeBadgeProps> = ({ isFree }) => {
  if (!isFree) return null;
  
  return (
    <div className="absolute top-3 right-3 z-10">
      <Badge className="bg-marketplace-green text-white px-2 py-1">
        FREE
      </Badge>
    </div>
  );
};

interface SoldBadgeProps {
  sold?: boolean;
}

export const SoldBadge: React.FC<SoldBadgeProps> = ({ sold }) => {
  if (!sold) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
      <Badge className="bg-[#ea384c] text-white px-4 py-2 text-lg transform rotate-[-15deg]">
        SOLD
      </Badge>
    </div>
  );
};
