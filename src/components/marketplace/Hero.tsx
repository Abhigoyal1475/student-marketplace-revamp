
import React, { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-24 pb-16 overflow-hidden bg-gradient-to-b from-marketplace-blue-light to-white">
      <Container>
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-10 opacity-0 translate-y-4 transition-all duration-700",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-marketplace-gray-900">
            Student Marketplace
          </h1>
          <p className="text-lg md:text-xl text-marketplace-gray-600 mb-6">
            Buy and sell second-hand items with fellow students.
            Find what you need or sell what you don't at student-friendly prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="rounded-full bg-marketplace-blue hover:bg-marketplace-blue-dark w-full sm:w-auto"
            >
              Browse Items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full w-full sm:w-auto"
            >
              Post an Item
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
