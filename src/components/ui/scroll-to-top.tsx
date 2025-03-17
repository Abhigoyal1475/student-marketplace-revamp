
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  threshold?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ threshold = 500 }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showScrollTop) return null;

  return (
    <button
      className="fixed bottom-6 right-6 p-3 rounded-full bg-marketplace-blue text-white shadow-lg hover:bg-marketplace-blue-dark transition-colors z-40 animate-fade-in"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTop;
