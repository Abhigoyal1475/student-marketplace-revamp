
import React from "react";
import { MapPin, Star, MessageCircle, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice, getRelativeTime } from "@/utils/product-utils";
import type { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="p-3 md:p-4 flex flex-col flex-grow">
      <div className="flex items-start justify-between mb-1">
        <h3 className={cn(
          "font-medium leading-tight line-clamp-1 group-hover:text-marketplace-blue transition-colors",
          isMobile ? "text-base" : "text-lg"
        )}>
          {product.title}
        </h3>
        <span className={cn(
          "font-semibold text-marketplace-gray-900 ml-2 whitespace-nowrap",
          isMobile ? "text-sm" : "text-base"
        )}>
          {formatPrice(product.price, product.isFree)}
        </span>
      </div>
      
      <div className="flex items-center text-xs md:text-sm text-marketplace-gray-500 mb-1 md:mb-2">
        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
        <span className="truncate">{product.location}</span>
        <span className="mx-1 md:mx-2 text-marketplace-gray-300">•</span>
        <span className="text-marketplace-gray-500">{getRelativeTime(product.createdAt)}</span>
      </div>
      
      {!isMobile && (
        <div className="flex items-center mb-2 md:mb-3">
          <Badge 
            variant="outline" 
            className="text-xs bg-marketplace-gray-50 text-marketplace-gray-700 mr-2 py-0 gap-1"
          >
            <Tag className="h-3 w-3" />
            {product.category}
          </Badge>
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs py-0",
              product.condition === "New" ? "bg-green-50 text-green-600" : 
              product.condition === "Like New" ? "bg-blue-50 text-blue-600" : 
              "bg-amber-50 text-amber-600"
            )}
          >
            {product.condition}
          </Badge>
        </div>
      )}
      
      <p className={cn(
        "text-marketplace-gray-600 line-clamp-2 mb-2 md:mb-3 flex-grow",
        isMobile ? "text-xs" : "text-sm"
      )}>
        {product.description}
      </p>
      
      <div className="mt-auto pt-2 md:pt-3 border-t border-marketplace-gray-100">
        <div className="flex items-center justify-between">
          <Link to={`/seller/${product.sellerName}`} className="flex items-center">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-marketplace-gray-200 rounded-full flex items-center justify-center text-xs text-marketplace-gray-700 mr-1 md:mr-2">
              {product.sellerName.charAt(0)}
            </div>
            <span className="text-xs md:text-sm font-medium">
              {product.sellerName}
              {product.isVerified && (
                <Star className="h-3 w-3 inline-block ml-1 fill-marketplace-blue" />
              )}
            </span>
          </Link>
          <Button 
            size="sm" 
            variant="ghost" 
            className="rounded-full h-6 w-6 p-0 hover:bg-marketplace-blue-light hover:text-marketplace-blue"
          >
            <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
