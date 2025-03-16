
import React from "react";
import { MapPin, Star, MessageCircle, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice, getRelativeTime } from "@/utils/product-utils";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-medium text-lg leading-tight line-clamp-1 group-hover:text-marketplace-blue transition-colors">
          {product.title}
        </h3>
        <span className="font-semibold text-marketplace-gray-900 ml-2 whitespace-nowrap">
          {formatPrice(product.price, product.isFree)}
        </span>
      </div>
      
      <div className="flex items-center text-sm text-marketplace-gray-500 mb-2">
        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
        <span className="truncate">{product.location}</span>
        <span className="mx-2 text-marketplace-gray-300">•</span>
        <span className="text-marketplace-gray-500">{getRelativeTime(product.createdAt)}</span>
      </div>
      
      <div className="flex items-center mb-3">
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
      
      <p className="text-sm text-marketplace-gray-600 line-clamp-2 mb-3 flex-grow">
        {product.description}
      </p>
      
      <div className="mt-auto pt-3 border-t border-marketplace-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-marketplace-gray-200 rounded-full flex items-center justify-center text-xs text-marketplace-gray-700 mr-2">
              {product.sellerName.charAt(0)}
            </div>
            <span className="text-sm font-medium">
              {product.sellerName}
              {product.isVerified && (
                <Star className="h-3 w-3 inline-block ml-1 fill-marketplace-blue" />
              )}
            </span>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="rounded-full hover:bg-marketplace-blue-light hover:text-marketplace-blue"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
