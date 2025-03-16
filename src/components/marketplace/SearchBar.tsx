
import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoSuggestions?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search for items... (e.g., 'Study Table' or 'Mattress')",
  onSearch,
  className,
  autoSuggestions = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Filter suggestions based on input
    if (value.trim() && autoSuggestions.length > 0) {
      const filtered = autoSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setFilteredSuggestions([]);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className={cn(
            "w-full py-3 px-4 pl-12 rounded-full border border-marketplace-gray-200 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-marketplace-blue focus:border-transparent",
            "transition-all duration-300 placeholder:text-marketplace-gray-400"
          )}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-marketplace-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-marketplace-blue text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-marketplace-blue-dark transition-colors"
        >
          Search
        </button>
      </form>

      {/* Auto-suggestions dropdown */}
      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-marketplace-gray-200 max-h-56 overflow-y-auto animate-slide-down">
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-marketplace-gray-50 cursor-pointer text-marketplace-gray-700"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
