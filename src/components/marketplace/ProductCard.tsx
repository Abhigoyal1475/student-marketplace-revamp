
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FeaturedBadge, FreeBadge, SoldBadge } from "./product-card/ProductBadges";
import ProductImage from "./product-card/ProductImage";
import ProductInfo from "./product-card/ProductInfo";
import ProductCardHover from "./product-card/ProductCardHover";
import type { Product } from "@/types/product";
import { Link } from "react-router-dom";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
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
      {/* Badges */}
      <FeaturedBadge show={featured} />
      <FreeBadge isFree={product.isFree} />
      <SoldBadge sold={product.sold} />
      
      {/* Product Image */}
      <ProductImage 
        src={product.thumbnail} 
        alt={product.title} 
        isHovered={isHovered} 
      />
      
      {/* Product Info */}
      <ProductInfo product={product} />

      {/* Hover overlay with action button */}
      <ProductCardHover isHovered={isHovered} product={product} />
    </div>
  );
};

export default ProductCard;

// Export the Product type for backward compatibility
export type { Product } from "@/types/product";
