
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, MessageCircle, ChevronLeft, Tag, Info, Calendar, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Product } from "@/components/marketplace/ProductCard";

// Mock data for demonstration - in a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: "1",
    title: "IKEA Study Desk - Great Condition",
    price: 50,
    location: "Near UH Campus",
    thumbnail: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=375&q=80",
    description: "Sturdy IKEA desk perfect for studying. Used for one semester only. Has some minor scratches but otherwise in great condition. Dimensions: 120cm x 60cm. Pickup only.",
    condition: "Used",
    category: "Furniture",
    createdAt: "2023-08-15T10:30:00Z",
    sellerName: "Alex",
    isVerified: true,
  },
  {
    id: "2",
    title: "Engineering Textbooks Bundle",
    price: 75,
    location: "Downtown Campus",
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3MlMjBzdGFja3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&h=375&q=80",
    description: "Set of 5 engineering textbooks including Calculus, Physics, and Programming fundamentals. All in good condition with minimal highlighting.",
    condition: "Used",
    category: "Books & Study Materials",
    createdAt: "2023-08-10T14:20:00Z",
    sellerName: "Jamie",
    isVerified: false,
  },
  {
    id: "3",
    title: "Mountain Bike - Perfect for Campus",
    price: 120,
    location: "East Campus",
    thumbnail: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&h=375&q=80",
    description: "Reliable mountain bike, perfect for getting around campus. 21 speeds, recently serviced with new brakes and tires. Lock included.",
    condition: "Used",
    category: "Bicycles & Transport",
    createdAt: "2023-08-05T09:15:00Z",
    sellerName: "Taylor",
    sold: true,
    isVerified: true,
  },
  {
    id: "4",
    title: "Microwave - Like New",
    isFree: true,
    price: 0,
    location: "West Apartments",
    thumbnail: "https://images.unsplash.com/photo-1585659722983-3a641a0a4101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1pY3Jvd2F2ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&h=375&q=80",
    description: "Moving out and giving away my microwave. Works perfectly, very clean. Pick up only from West Apartments.",
    condition: "Like New",
    category: "Home Essentials",
    createdAt: "2023-08-01T16:45:00Z",
    sellerName: "Jordan",
    isVerified: false,
  },
  {
    id: "5",
    title: "MacBook Pro 2020 - Great for Classes",
    price: 800,
    location: "Student Center",
    thumbnail: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8&auto=format&fit=crop&w=500&h=375&q=80",
    description: "MacBook Pro 2020, 13-inch, 8GB RAM, 256GB SSD. In excellent condition, battery health at 92%. Comes with charger and protective case.",
    condition: "Like New",
    category: "Electronics & Gadgets",
    createdAt: "2023-07-25T11:30:00Z",
    sellerName: "Morgan",
    isVerified: true,
  }
];

// Function to format relative time (e.g., "2 days ago")
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

// Format price
const formatPrice = (price: number, isFree?: boolean) => {
  if (isFree) return "FREE";
  return `$${price}`;
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  
  // Find the product from the mock data
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-semibold text-marketplace-gray-900 mb-4">Product Not Found</h2>
        <p className="text-marketplace-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }
  
  // Sample images for the gallery (in a real app, these would come from the product data)
  const images = [
    product.thumbnail,
    "https://images.unsplash.com/photo-1618142010777-b18125ae4dbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hcmtldHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&h=375&q=80",
    "https://images.unsplash.com/photo-1626753597827-2801be60b757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hcmtldHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&h=375&q=80",
  ];

  // Similar products (excluding the current one)
  const similarProducts = mockProducts.filter(p => 
    p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className="bg-marketplace-gray-50 min-h-screen pb-12">
      {/* Back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Link 
            to="/" 
            className="inline-flex items-center text-marketplace-gray-600 hover:text-marketplace-blue transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Marketplace
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-white rounded-xl overflow-hidden">
              {product.sold && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
                  <Badge className="bg-[#ea384c] text-white px-6 py-3 text-2xl transform rotate-[-15deg]">
                    SOLD
                  </Badge>
                </div>
              )}
              <img 
                src={images[activeImage]} 
                alt={product.title} 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={cn(
                    "relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0",
                    activeImage === index && "ring-2 ring-marketplace-blue"
                  )}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h1 className="text-2xl font-semibold text-marketplace-gray-900">{product.title}</h1>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Share2 className="h-5 w-5 text-marketplace-gray-600" />
              </Button>
            </div>
            
            <div className="text-2xl font-bold text-marketplace-gray-900 mb-4">
              {formatPrice(product.price, product.isFree)}
              {product.isFree && (
                <Badge className="bg-marketplace-green text-white ml-2 px-2">
                  FREE
                </Badge>
              )}
            </div>
            
            <div className="flex items-center mb-4">
              <MapPin className="h-4 w-4 text-marketplace-gray-600 mr-1.5" />
              <span className="text-marketplace-gray-600">{product.location}</span>
              <span className="mx-2 text-marketplace-gray-300">•</span>
              <Calendar className="h-4 w-4 text-marketplace-gray-600 mr-1.5" />
              <span className="text-marketplace-gray-600">{getRelativeTime(product.createdAt)}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <Badge 
                variant="outline" 
                className="text-sm bg-marketplace-gray-50 text-marketplace-gray-700 py-1 gap-1"
              >
                <Tag className="h-3.5 w-3.5" />
                {product.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-sm py-1",
                  product.condition === "New" ? "bg-green-50 text-green-600" : 
                  product.condition === "Like New" ? "bg-blue-50 text-blue-600" : 
                  "bg-amber-50 text-amber-600"
                )}
              >
                {product.condition}
              </Badge>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h3 className="font-medium text-marketplace-gray-900 mb-2">Description</h3>
              <p className="text-marketplace-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h3 className="font-medium text-marketplace-gray-900 mb-3">Seller Information</h3>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-marketplace-gray-200 rounded-full flex items-center justify-center text-sm text-marketplace-gray-700 mr-3">
                  {product.sellerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{product.sellerName}</span>
                    {product.isVerified && (
                      <Badge 
                        variant="outline" 
                        className="ml-2 text-xs bg-blue-50 text-marketplace-blue border-blue-100 gap-1"
                      >
                        <Star className="h-3 w-3 fill-marketplace-blue" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-marketplace-gray-500">Member since Jan 2023</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full bg-marketplace-green hover:bg-marketplace-green/90 gap-2 h-12">
                <MessageCircle className="h-5 w-5" />
                Contact Seller
              </Button>
              <div className="flex items-start gap-2 text-sm text-marketplace-gray-500">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <p>
                  For your safety, always meet in public places and be cautious when making transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Listings */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-marketplace-gray-900">Similar Listings</h2>
              <Button variant="ghost" className="text-marketplace-blue">
                View More
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similarProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group rounded-xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {product.sold && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
                        <Badge className="bg-[#ea384c] text-white px-4 py-2 text-lg transform rotate-[-15deg]">
                          SOLD
                        </Badge>
                      </div>
                    )}
                    <img 
                      src={product.thumbnail} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-marketplace-blue transition-colors">
                      {product.title}
                    </h3>
                    <p className="font-semibold text-marketplace-gray-900 mb-2">
                      {formatPrice(product.price, product.isFree)}
                    </p>
                    <div className="flex items-center text-sm text-marketplace-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{product.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
