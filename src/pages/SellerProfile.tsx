
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/types/product";
import { User, MapPin, Mail, Phone, ShieldCheck, Clock } from "lucide-react";
import Container from "@/components/ui/container";
import Navbar from "@/components/layout/Navbar";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS } from "./Index";

// Mock user data
const MOCK_USERS = [
  {
    username: "Alex",
    fullName: "Alex Johnson",
    email: "alex.j@university.edu",
    phone: "(555) 123-4567",
    location: "Near UH Campus",
    joinedDate: "2023-01-15T10:00:00Z",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Graduate student in Computer Science. I sell items I no longer need to help fund my education. Always open to reasonable offers!"
  },
  {
    username: "Maria",
    fullName: "Maria Rodriguez",
    email: "maria.r@university.edu",
    phone: "(555) 234-5678",
    location: "Downtown",
    joinedDate: "2023-02-20T14:30:00Z",
    isVerified: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Third-year Economics student. I sell textbooks and study materials from previous semesters. Quick responses guaranteed!"
  },
  {
    username: "John",
    fullName: "John Smith",
    email: "john.s@university.edu",
    phone: "(555) 345-6789",
    location: "West Campus",
    joinedDate: "2023-03-10T09:15:00Z",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Engineering student and bike enthusiast. I repair and sell bicycles in my free time. All bikes are thoroughly checked before selling."
  },
  {
    username: "Emma",
    fullName: "Emma Wilson",
    email: "emma.w@university.edu",
    phone: "(555) 456-7890",
    location: "University Area",
    joinedDate: "2023-04-05T16:45:00Z",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Computer Science major with a focus on UI/UX. I sell electronics that I've upgraded from. All items are well maintained and come with original packaging when possible."
  },
];

// Format date to readable format
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const SellerProfile = () => {
  const { sellerName } = useParams<{ sellerName: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch seller data
    setIsLoading(true);
    
    setTimeout(() => {
      // Find seller
      const foundSeller = MOCK_USERS.find(user => user.username === sellerName);
      setSeller(foundSeller || null);
      
      // Find seller's products
      const products = MOCK_PRODUCTS.filter(product => product.sellerName === sellerName);
      setSellerProducts(products);
      
      setIsLoading(false);
    }, 1000);
    
  }, [sellerName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-marketplace-gray-50">
        <Navbar />
        <Container>
          <div className="py-16 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-gray-200 h-24 w-24 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-marketplace-gray-50">
        <Navbar />
        <Container>
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Seller Not Found</h1>
            <p className="text-marketplace-gray-600 mb-8">
              The seller profile you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <a href="/">Back to Marketplace</a>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-marketplace-gray-50">
      <Navbar />
      
      <Container className="py-12">
        {/* Seller Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img 
                  src={seller.avatar} 
                  alt={seller.fullName} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                {seller.isVerified && (
                  <div className="absolute bottom-0 right-0 bg-green-100 rounded-full p-1.5 border-2 border-white">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              <h1 className="text-xl font-bold mt-4">{seller.fullName}</h1>
              <p className="text-marketplace-gray-600 text-sm">@{seller.username}</p>
              <div className="flex items-center justify-center mt-2 text-sm text-marketplace-gray-500">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Joined {formatDate(seller.joinedDate)}</span>
              </div>
            </div>
            
            {/* Seller details */}
            <div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">About</h2>
                  <p className="text-marketplace-gray-700">{seller.bio}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2 text-marketplace-gray-700">
                    <MapPin className="h-4 w-4 text-marketplace-gray-500" />
                    <span>{seller.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-marketplace-gray-700">
                    <Mail className="h-4 w-4 text-marketplace-gray-500" />
                    <span>{seller.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-marketplace-gray-700">
                    <Phone className="h-4 w-4 text-marketplace-gray-500" />
                    <span>{seller.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {seller.isVerified ? (
                      <span className="text-green-600 flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        Verified Seller
                      </span>
                    ) : (
                      <span className="text-marketplace-gray-500">Not Verified</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="bg-marketplace-blue">
                  Contact Seller
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seller's Listings */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <User className="h-5 w-5 mr-2" />
            {seller.username}'s Listings ({sellerProducts.length})
          </h2>
          
          {sellerProducts.length > 0 ? (
            <ProductGrid products={sellerProducts} loading={false} />
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-marketplace-gray-500">This seller has no listings yet.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SellerProfile;
