
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MapPin, Star, MessageCircle, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  title: string;
  price: number;
  isFree?: boolean;
  location: string;
  thumbnail: string;
  description: string;
  condition: "New" | "Like New" | "Used";
  category: string;
  createdAt: string;
  sellerName: string;
  isVerified?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
  style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  featured = false,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format price
  const formatPrice = (price: number, isFree?: boolean) => {
    if (isFree) return "FREE";
    return `$${price}`;
  };

  // Format relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        "group rounded-xl overflow-hidden bg-white card-shadow flex flex-col h-full",
        "transition-all duration-300 relative",
        featured && "border-2 border-marketplace-blue ring-2 ring-blue-100",
        className
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-marketplace-blue text-white px-2 py-1">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Featured
          </Badge>
        </div>
      )}
      
      {/* Free Badge */}
      {product.isFree && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-marketplace-green text-white px-2 py-1">
            FREE
          </Badge>
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-marketplace-gray-100">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-marketplace-gray-100">
            <div className="w-12 h-12 rounded-full border-4 border-t-marketplace-blue border-b-marketplace-blue border-marketplace-gray-200 animate-spin" />
          </div>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-110" : "scale-100",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Product Info */}
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

      {/* Hover overlay with action button */}
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
    </Link>
  );
};

export default ProductCard;
