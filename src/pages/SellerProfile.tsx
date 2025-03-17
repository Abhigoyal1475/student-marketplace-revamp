
import React from "react";
import { useParams } from "react-router-dom";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_PRODUCTS } from "@/data/mockData";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { Product } from "@/types/product";
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Mail, 
  Phone,
  User
} from "lucide-react";

const SellerProfile: React.FC = () => {
  // Get seller ID from URL params
  const { sellerId } = useParams<{ sellerId: string }>();
  
  // In a real app, you'd fetch seller data from an API
  // For this demo, we'll create mock data
  const sellerData = {
    id: sellerId || "1",
    name: "Alex Johnson",
    username: "alex_j",
    bio: "Graduate student selling items I no longer need. All items are in good condition and prices are negotiable.",
    memberSince: "January 2023",
    location: "Stratford Apartments",
    email: "alex@example.edu",
    phone: "+1 (555) 123-4567",
    verified: true,
    rating: 4.8,
    reviewCount: 27,
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  };
  
  // Filter products by this seller
  const sellerProducts: Product[] = MOCK_PRODUCTS.filter(
    (product) => product.sellerId === sellerData.id
  );
  
  return (
    <Container className="py-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Seller Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 h-fit">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
              <img
                src={sellerData.profileImage}
                alt={sellerData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold">{sellerData.name}</h1>
            <p className="text-marketplace-gray-500">@{sellerData.username}</p>
            
            <div className="flex items-center mt-2 gap-1">
              <Badge variant="secondary" className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified</span>
              </Badge>
              <Badge variant="outline">{sellerData.rating} ★</Badge>
            </div>
            
            <Button className="mt-4 w-full bg-marketplace-blue">
              Contact Seller
            </Button>
          </div>
          
          {/* Seller Details */}
          <div className="space-y-4 pt-4 border-t border-marketplace-gray-100">
            <div className="flex gap-3 text-marketplace-gray-600">
              <Clock className="h-5 w-5 text-marketplace-gray-400" />
              <div>
                <p className="text-sm font-medium text-marketplace-gray-900">Member Since</p>
                <p className="text-sm">{sellerData.memberSince}</p>
              </div>
            </div>
            
            <div className="flex gap-3 text-marketplace-gray-600">
              <MapPin className="h-5 w-5 text-marketplace-gray-400" />
              <div>
                <p className="text-sm font-medium text-marketplace-gray-900">Location</p>
                <p className="text-sm">{sellerData.location}</p>
              </div>
            </div>
            
            <div className="flex gap-3 text-marketplace-gray-600">
              <Mail className="h-5 w-5 text-marketplace-gray-400" />
              <div>
                <p className="text-sm font-medium text-marketplace-gray-900">Email</p>
                <p className="text-sm">{sellerData.email}</p>
              </div>
            </div>
            
            <div className="flex gap-3 text-marketplace-gray-600">
              <Phone className="h-5 w-5 text-marketplace-gray-400" />
              <div>
                <p className="text-sm font-medium text-marketplace-gray-900">Phone</p>
                <p className="text-sm">{sellerData.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-marketplace-gray-100">
            <div className="flex items-center gap-2 text-marketplace-gray-600">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <p className="text-sm">
                <span className="font-medium text-marketplace-gray-900">Trust & Safety:</span> Verified university email and student ID
              </p>
            </div>
          </div>
        </div>
        
        {/* Seller Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Items from {sellerData.name}</h2>
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
                <span>Reviews ({sellerData.reviewCount})</span>
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
      </div>
    </Container>
  );
};

export default SellerProfile;
