
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { Product } from "@/types/product";

interface SellerProductTabsProps {
  sellerName: string;
  sellerProducts: Product[];
  reviewCount: number;
}

const SellerProductTabs: React.FC<SellerProductTabsProps> = ({ 
  sellerName, 
  sellerProducts, 
  reviewCount
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Items from {sellerName}</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <span>{sellerProducts.length} Items</span>
        </Badge>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Active Listings</span>
          </TabsTrigger>
          <TabsTrigger value="sold" className="flex items-center gap-2">
            <span>Sold Items</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <span>Reviews ({reviewCount})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {sellerProducts.length > 0 ? (
            <ProductGrid products={sellerProducts} />
          ) : (
            <div className="text-center py-12 bg-marketplace-gray-50 rounded-lg">
              <p className="text-marketplace-gray-500">No active listings found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sold">
          <div className="text-center py-12 bg-marketplace-gray-50 rounded-lg">
            <p className="text-marketplace-gray-500">No sold items to display.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="text-center py-12 bg-marketplace-gray-50 rounded-lg">
            <p className="text-marketplace-gray-500">No reviews yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerProductTabs;
