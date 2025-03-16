
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { formatPrice, getRelativeTime } from "@/utils/product-utils";
import { Link } from "react-router-dom";
import { User, MapPin, Tag, CalendarDays, ShieldCheck } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardHoverProps {
  isHovered: boolean;
  product: Product;
}

const ProductCardHover: React.FC<ProductCardHoverProps> = ({ isHovered, product }) => {
  return (
    <div className={cn(
      "absolute inset-0 bg-black/5 backdrop-blur-[2px] pointer-events-none flex items-center justify-center opacity-0 transition-opacity duration-300",
      isHovered && "opacity-100 pointer-events-auto"
    )}>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            className="bg-white text-marketplace-gray-800 hover:bg-marketplace-blue hover:text-white transition-colors shadow-lg"
          >
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] overflow-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{product.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-marketplace-gray-600">
              <MapPin className="h-4 w-4" /> {product.location}
              {product.society && <span>• {product.society}</span>}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-marketplace-gray-900">
                  {formatPrice(product.price, product.isFree)}
                </h3>
                {product.sold && (
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Sold
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-marketplace-gray-700">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-marketplace-gray-500" />
                  <span>{product.category} • {product.condition}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-marketplace-gray-500" />
                  <span>Posted {getRelativeTime(product.createdAt)}</span>
                </div>
                
                <Link to={`/seller/${product.sellerName}`} className="flex items-center gap-2 text-marketplace-blue hover:underline">
                  <User className="h-4 w-4" />
                  <span>{product.sellerName}</span>
                  {product.isVerified && (
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                  )}
                </Link>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-marketplace-gray-700">{product.description}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCardHover;
