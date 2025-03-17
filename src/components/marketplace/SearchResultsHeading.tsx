
import React from "react";

interface SearchResultsHeadingProps {
  searchQuery: string;
  society: string;
  category: string;
}

const SearchResultsHeading: React.FC<SearchResultsHeadingProps> = ({
  searchQuery,
  society,
  category,
}) => {
  let headingText = "Browse All Items";

  if (searchQuery) {
    headingText = `Search Results for "${searchQuery}"`;
  } else if (society !== "All Societies") {
    headingText = `Items in ${society}`;
  } else if (category !== "all") {
    headingText = `${category.charAt(0).toUpperCase() + category.slice(1)} Items`;
  }

  return (
    <h2 className="text-xl font-semibold mb-6">
      {headingText}
    </h2>
  );
};

export default SearchResultsHeading;
