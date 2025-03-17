import { Product } from "@/types/product";

// List of housing societies
export const HOUSING_SOCIETIES = [
  "All Societies",
  "Stratford",
  "Scotland",
  "Holly Hall",
  "Windsor Hill",
  "Cambridge Commons",
  "College Suites",
  "University Village",
  "Campus Edge"
];

// Mock data for demo
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "IKEA Study Desk - Great Condition",
    price: 50,
    location: "Near UH Campus",
    thumbnail: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Perfect desk for studying, in excellent condition. Spacious surface and sturdy build. Moving out so need to sell quickly!",
    condition: "Like New",
    category: "Furniture",
    createdAt: "2023-08-15T12:00:00Z",
    sellerName: "Alex",
    isVerified: true,
    society: "Stratford"
  },
  {
    id: "2",
    title: "Calculus Textbook - 8th Edition",
    price: 25,
    location: "Downtown",
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Calculus textbook in good condition, with minor highlighting. All pages intact.",
    condition: "Used",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-14T10:30:00Z",
    sellerName: "Maria",
    society: "Scotland"
  },
  {
    id: "3",
    title: "Mountain Bike - Trek",
    price: 120,
    location: "West Campus",
    thumbnail: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Trek mountain bike with 21 gears, recently serviced. Great for getting around campus and weekend rides.",
    condition: "Used",
    category: "Bicycles & Transport",
    createdAt: "2023-08-13T15:45:00Z",
    sellerName: "John",
    isVerified: true,
    society: "Holly Hall"
  },
  {
    id: "4",
    title: "MacBook Air M1 2020",
    price: 600,
    location: "University Area",
    thumbnail: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Battery health at 92%, comes with charger and case.",
    condition: "Like New",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-12T09:20:00Z",
    sellerName: "Emma",
    isVerified: true,
    society: "Windsor Hill"
  },
  {
    id: "5",
    title: "Mini Refrigerator",
    price: 70,
    location: "Residential Halls",
    thumbnail: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Compact refrigerator, perfect for dorm rooms. 3.2 cubic feet with freezer compartment.",
    condition: "Used",
    category: "Home Essentials",
    createdAt: "2023-08-11T14:15:00Z",
    sellerName: "David",
    society: "Cambridge Commons"
  },
  {
    id: "6",
    title: "Electric Scooter",
    price: 200,
    location: "Near Medical Center",
    thumbnail: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Electric scooter with 25 mile range, perfect for commuting to campus. Foldable and lightweight.",
    condition: "Like New",
    category: "Bicycles & Transport",
    createdAt: "2023-08-09T16:40:00Z",
    sellerName: "James",
    society: "College Suites"
  },
  {
    id: "7",
    title: "Desk Lamp with Wireless Charger",
    price: 30,
    location: "Student Housing",
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Modern desk lamp with adjustable brightness and built-in wireless charger. USB port included.",
    condition: "New",
    category: "Home Essentials",
    createdAt: "2023-08-08T13:50:00Z",
    sellerName: "Olivia",
    society: "University Village"
  },
  {
    id: "8",
    title: "Ergonomic Office Chair",
    price: 85,
    location: "South Campus",
    thumbnail: "https://images.unsplash.com/photo-1541558869434-2f86637b9d33?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Comfortable office chair with lumbar support and adjustable height. Great for long study sessions.",
    condition: "Used",
    category: "Furniture",
    createdAt: "2023-08-07T10:15:00Z",
    sellerName: "Daniel",
    society: "Campus Edge"
  },
  {
    id: "9",
    title: "Scientific Calculator - TI-84",
    price: 40,
    location: "Math Department",
    thumbnail: "https://images.unsplash.com/photo-1564815334653-3b8b33635e2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "TI-84 Plus graphing calculator, perfect for math, engineering, and science courses.",
    condition: "Used",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-06T09:10:00Z",
    sellerName: "Ava",
    society: "Stratford"
  },
  {
    id: "10",
    title: "Microwave - Compact Size",
    isFree: true,
    price: 0,
    location: "Near Library",
    thumbnail: "https://images.unsplash.com/photo-1585240947397-ee649adab6c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Small microwave in working condition. Moving out and need it gone ASAP - free to whoever needs it!",
    condition: "Used",
    category: "Home Essentials",
    createdAt: "2023-08-05T14:30:00Z",
    sellerName: "Noah",
    society: "Scotland"
  },
  {
    id: "11",
    title: "Drawing Tablet - Wacom",
    price: 70,
    location: "Art Department",
    thumbnail: "https://images.unsplash.com/photo-1561225360-05df2db7c44a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Wacom drawing tablet, barely used. Perfect for digital art and design courses.",
    condition: "Like New",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-04T11:45:00Z",
    sellerName: "Isabella",
    isVerified: true,
    society: "Holly Hall"
  },
  {
    id: "12",
    title: "Blue Mechanical Keyboard",
    price: 45,
    sold: true,
    location: "Campus Center",
    thumbnail: "https://images.unsplash.com/photo-1595044426096-d7e1c8d8efe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Cherry MX Blue mechanical keyboard. Excellent for typing papers and light gaming.",
    condition: "Used",
    category: "Electronics & Gadgets",
    createdAt: "2023-08-03T16:20:00Z",
    sellerName: "Alex",
    isVerified: true,
    society: "Windsor Hill"
  },
];

// Search suggestions
export const SEARCH_SUGGESTIONS = [
  "Desk", "Chair", "Bike", "Laptop", "Bicycle", 
  "Microwave", "Refrigerator", "Calculator", "Bookshelf",
  "Monitor", "Keyboard", "Bed Frame", "Mattress"
];
