
import React, { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PostItemDialog from "./PostItemDialog";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2000&q=80')",
          backgroundAttachment: "fixed" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-marketplace-blue/90 to-marketplace-blue-light/90" />
      </div>
      
      <Container className="relative z-10">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-10 opacity-0 translate-y-4 transition-all duration-700",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Student Marketplace
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            Buy and sell second-hand items with fellow students.
            Find what you need or sell what you don't at student-friendly prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="rounded-full bg-white text-marketplace-blue hover:bg-gray-100 hover:text-marketplace-blue-dark w-full sm:w-auto"
            >
              Browse Items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <PostItemDialog 
              buttonVariant="outline" 
              buttonClassName="rounded-full w-full sm:w-auto border-white text-white hover:bg-white/20 hover:text-white"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
