
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  isHovered: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, isHovered }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-marketplace-gray-100">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-marketplace-gray-100">
          <div className="w-12 h-12 rounded-full border-4 border-t-marketplace-blue border-b-marketplace-blue border-marketplace-gray-200 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          isHovered ? "scale-110" : "scale-100",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProductImage;
