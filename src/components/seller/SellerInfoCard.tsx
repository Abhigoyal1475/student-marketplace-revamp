
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, MapPin, Mail, Phone } from "lucide-react";

interface SellerData {
  id: string;
  name: string;
  username: string;
  bio: string;
  memberSince: string;
  location: string;
  email: string;
  phone: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  profileImage: string;
}

interface SellerInfoCardProps {
  sellerData: SellerData;
}

const SellerInfoCard: React.FC<SellerInfoCardProps> = ({ sellerData }) => {
  return (
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
  );
};

export default SellerInfoCard;
