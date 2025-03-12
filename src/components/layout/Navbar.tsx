
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Menu, X, PlusCircle, User, ShoppingBag } from "lucide-react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-marketplace-blue" />
            <span className="text-xl font-semibold text-marketplace-gray-900">
              StudentMarket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-marketplace-gray-700 hover:text-marketplace-blue transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/categories"
              className="text-marketplace-gray-700 hover:text-marketplace-blue transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/featured"
              className="text-marketplace-gray-700 hover:text-marketplace-blue transition-colors"
            >
              Featured
            </Link>
            <Link
              to="/about"
              className="text-marketplace-gray-700 hover:text-marketplace-blue transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full flex items-center gap-1"
              asChild
            >
              <Link to="/search">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-full bg-marketplace-green hover:bg-marketplace-green-dark"
              asChild
            >
              <Link to="/post-item">
                <PlusCircle className="h-4 w-4 mr-1" />
                <span>Post Item</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              asChild
            >
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-marketplace-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-marketplace-gray-800" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <Container className="py-6 flex flex-col">
            <nav className="flex flex-col space-y-5 py-5">
              <Link
                to="/"
                className="text-lg text-marketplace-gray-800 hover:text-marketplace-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                to="/categories"
                className="text-lg text-marketplace-gray-800 hover:text-marketplace-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/featured"
                className="text-lg text-marketplace-gray-800 hover:text-marketplace-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Featured
              </Link>
              <Link
                to="/about"
                className="text-lg text-marketplace-gray-800 hover:text-marketplace-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-marketplace-gray-100">
              <Button asChild className="w-full justify-center bg-marketplace-blue">
                <Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>
                  <Search className="h-4 w-4 mr-2" />
                  Search Items
                </Link>
              </Button>
              <Button 
                asChild 
                className="w-full justify-center bg-marketplace-green hover:bg-marketplace-green-dark"
              >
                <Link to="/post-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post Item
                </Link>
              </Button>
              <Button 
                variant="outline" 
                asChild 
                className="w-full justify-center"
              >
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Link>
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
