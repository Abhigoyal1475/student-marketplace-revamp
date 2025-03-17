
import React from "react";
import { useParams } from "react-router-dom";
import Container from "@/components/ui/container";
import SellerInfoCard from "@/components/seller/SellerInfoCard";
import SellerProductTabs from "@/components/seller/SellerProductTabs";
import { getMockSellerData, getSellerProducts } from "@/utils/seller-utils";

const SellerProfile: React.FC = () => {
  // Get seller ID from URL params
  const { sellerId } = useParams<{ sellerId: string }>();
  
  // Get seller data and products
  const sellerData = getMockSellerData(sellerId || "1");
  const sellerProducts = getSellerProducts(sellerData.name);
  
  return (
    <Container className="py-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Seller Info Card */}
        <SellerInfoCard sellerData={sellerData} />
        
        {/* Seller Content */}
        <SellerProductTabs 
          sellerName={sellerData.name}
          sellerProducts={sellerProducts}
          reviewCount={sellerData.reviewCount}
        />
      </div>
    </Container>
  );
};

export default SellerProfile;
