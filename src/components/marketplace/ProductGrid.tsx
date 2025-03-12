
import React from "react";
import { cn } from "@/lib/utils";
import ProductCard, { Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className,
  loading = false,
}) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
        className
      )}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="rounded-xl overflow-hidden card-shadow">
            <div className="aspect-[4/3] bg-marketplace-gray-100 shimmer" />
            <div className="p-4">
              <div className="h-6 bg-marketplace-gray-100 shimmer rounded mb-2 w-3/4" />
              <div className="h-4 bg-marketplace-gray-100 shimmer rounded mb-2 w-1/2" />
              <div className="h-4 bg-marketplace-gray-100 shimmer rounded mb-3 w-1/3" />
              <div className="h-12 bg-marketplace-gray-100 shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // No products found
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-marketplace-gray-300 mb-6"
        >
          <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
          <path d="m8 12 4 4 4-4" />
          <path d="M12 8v8" />
        </svg>
        <h3 className="text-xl font-medium text-marketplace-gray-900 mb-2">No items found</h3>
        <p className="text-marketplace-gray-500 max-w-md">
          We couldn't find any items matching your search or filters. Try adjusting your search criteria or check back later!
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full",
      className
    )}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          featured={index === 0} // Mark first item as featured for demo
          className="animate-scale-in"
          style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
