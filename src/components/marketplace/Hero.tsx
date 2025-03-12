
import React, { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import { ArrowRight, Home, Wifi, Bus, Book, Utensils, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Resource tile type
interface ResourceTile {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  link: string;
}

const resourceTiles: ResourceTile[] = [
  {
    id: 1,
    icon: <Home className="h-6 w-6" />,
    title: "Housing",
    description: "Find student-friendly accommodation options.",
    color: "bg-blue-50 text-blue-600",
    link: "/resources/housing",
  },
  {
    id: 2,
    icon: <Wifi className="h-6 w-6" />,
    title: "Internet",
    description: "Best internet plans for students.",
    color: "bg-purple-50 text-purple-600",
    link: "/resources/internet",
  },
  {
    id: 3,
    icon: <Bus className="h-6 w-6" />,
    title: "Transportation",
    description: "Get around campus and the city easily.",
    color: "bg-green-50 text-green-600",
    link: "/resources/transportation",
  },
  {
    id: 4,
    icon: <Book className="h-6 w-6" />,
    title: "Study Resources",
    description: "Access study materials and tutoring.",
    color: "bg-amber-50 text-amber-600",
    link: "/resources/study",
  },
  {
    id: 5,
    icon: <Utensils className="h-6 w-6" />,
    title: "Food & Dining",
    description: "Affordable meal options near campus.",
    color: "bg-red-50 text-red-600",
    link: "/resources/food",
  },
  {
    id: 6,
    icon: <CreditCard className="h-6 w-6" />,
    title: "Financial Tips",
    description: "Money saving tips for students.",
    color: "bg-teal-50 text-teal-600",
    link: "/resources/finance",
  },
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Duplicate tiles to create a continuous flow
  const allTiles = [...resourceTiles, ...resourceTiles];

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

        <div className="tile-container mx-auto mt-10 mb-8">
          <h2 className={cn(
            "text-xl font-medium mb-6 text-center opacity-0 transition-all duration-500",
            isVisible && "opacity-100"
          )}>
            Student Resources
          </h2>
          
          <div className="tiles grid grid-cols-2 md:grid-cols-3 gap-4">
            {allTiles.map((tile, index) => (
              <div 
                key={`${tile.id}-${index}`}
                className={cn(
                  "tile p-5 rounded-xl card-shadow cursor-pointer transition-all",
                  tile.color
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="p-2 rounded-full w-fit mb-3">
                    {tile.icon}
                  </div>
                  <h3 className="font-medium mb-1">{tile.title}</h3>
                  <p className="text-sm opacity-80 mb-3">{tile.description}</p>
                  <div className="mt-auto">
                    <span className="text-sm font-medium flex items-center">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
