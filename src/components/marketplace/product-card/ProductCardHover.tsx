
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardHoverProps {
  isHovered: boolean;
}

const ProductCardHover: React.FC<ProductCardHoverProps> = ({ isHovered }) => {
  return (
    <div className={cn(
      "absolute inset-0 bg-black/5 backdrop-blur-[2px] pointer-events-none flex items-center justify-center opacity-0 transition-opacity duration-300",
      isHovered && "opacity-100 pointer-events-auto"
    )}>
      <Button 
        className="bg-white text-marketplace-gray-800 hover:bg-marketplace-blue hover:text-white transition-colors shadow-lg"
      >
        View Details
      </Button>
    </div>
  );
};

export default ProductCardHover;
