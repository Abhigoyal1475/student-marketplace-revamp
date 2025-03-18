
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "./ProductCard";

interface FeaturedListingsProps {
  products: Product[];
  className?: string;
  title?: string;
  showViewMore?: boolean;
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({
  products,
  className,
  title = "Featured Listings",
  showViewMore = true,
}) => {
  // Take first 6 products for featured
  const featuredProducts = products.slice(0, 6);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold text-marketplace-gray-900">
            {title}
          </h2>
        </div>
        {showViewMore && (
          <Button variant="ghost" className="text-marketplace-blue group" asChild>
            <a href="/featured">
              View all
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-5">
        {featuredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            featured={true}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
